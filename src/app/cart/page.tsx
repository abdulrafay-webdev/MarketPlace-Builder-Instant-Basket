
"use client";
import React, { useEffect, useState } from "react";
import iProduct from "@/types/product";

function CartPage() {
  const [cartItems, setCartItems] = useState<iProduct[]>([]);

  // Load cart items from localStorage
  useEffect(() => {
    const value = localStorage.getItem("cart");
    const cart = value ? JSON.parse(value) : {};
    const items = Object.values(cart) as iProduct[]; // Explicitly defining the type
    setCartItems(items);
  }, []);

  // Update cart in localStorage
  const updateCart = (updatedCart: iProduct[]) => { // Type annotation added
    const cartObject = updatedCart.reduce((acc, item) => {
      acc[item._id] = item;
      return acc;
    }, {} as Record<string, iProduct>); // Define a type for accumulator
    localStorage.setItem("cart", JSON.stringify(cartObject));
    setCartItems(updatedCart);
  };

  // Remove product from cart
  const removeProduct = (productId: string) => { // Specify the type for productId
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    updateCart(updatedCart);
  };

  // Update product quantity
  const updateQuantity = (productId: string, quantity: number) => { // Specify types
    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    updateCart(updatedCart);
  };

  const calculateTotal = (): number => 
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Shopping Cart
        </h1>
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
                  <img
                    src={item.ProductImage}
                    alt={item.name}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.categoryName}</p>
                    <p className="text-sm text-gray-600 mt-1">Price: PKR {item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                      -
                    </button>
                    <span className="px-4 py-1 border">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-600">
                      Subtotal: PKR {item.price * item.quantity}
                    </p>
                    <button
                      className="text-red-500 hover:underline text-sm mt-1"
                      onClick={() => removeProduct(item._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 h-fit rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Items:</span>
                <span className="text-sm text-gray-800">{cartItems.length}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Delivery:</span>
                <span className="text-sm text-gray-800">PKR 90 /-</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Total:</span>
                <span className="text-lg font-bold text-gray-800">PKR {calculateTotal() + 90 }</span>
              </div>
              <button
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 mt-4">
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-600">
            <p>Your cart is empty!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;



