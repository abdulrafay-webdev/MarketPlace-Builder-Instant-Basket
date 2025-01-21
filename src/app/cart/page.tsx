// 'use client'
// import iProduct from '@/types/product'
// import React, { useEffect } from 'react'

// function page() {
//   useEffect(() => {
//     const value = localStorage.getItem('cart')
//     const cart = JSON.parse(value || '{}')
//     console.log(cart)
//   }, [])
//   return (
//     <div>
//     hello
//     </div>
//   )
// }

// export default page



'use client'
import React, { useEffect, useState } from 'react'
import iProduct from '@/types/product'

function CartPage() {
  const [cartItems, setCartItems] = useState<iProduct[]>([])

  // Load cart items from localStorage
  useEffect(() => {
    const value = localStorage.getItem('cart')
    const cart = value ? JSON.parse(value) : {}
    const items = Object.values(cart)
    setCartItems(items)
  }, [])

  // Update cart in localStorage
  const updateCart = (updatedCart) => {
    const cartObject = updatedCart.reduce((acc, item) => {
      acc[item._id] = item
      return acc
    }, {})
    localStorage.setItem('cart', JSON.stringify(cartObject))
    setCartItems(updatedCart)
  }

  // Remove product from cart
  const removeProduct = (productId) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId)
    updateCart(updatedCart)
  }

  // Update product quantity
  const updateQuantity = (productId, quantity) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
    updateCart(updatedCart)
  }

  const calculateTotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Shopping Cart</h1>
        {cartItems.length > 0 ? (
          <div>
            <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Product</th>
                  <th className="border border-gray-300 px-4 py-2">Price</th>
                  <th className="border border-gray-300 px-4 py-2">Quantity</th>
                  <th className="border border-gray-300 px-4 py-2">Total</th>
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 flex items-center space-x-4">
                      <img
                        src={item.ProductImage}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div>
                        <h2 className="text-sm font-medium">{item.name}</h2>
                        <p className="text-xs text-gray-500">{item.categoryName}</p>
                      </div>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{`$${item.price}`}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-l"
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 bg-gray-200 rounded-r"
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">{`$${item.price * item.quantity}`}</td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => removeProduct(item._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 text-right">
              <h3 className="text-lg font-semibold">
                Total: <span className="text-green-600">${calculateTotal()}</span>
              </h3>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            <p>Your cart is empty!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
