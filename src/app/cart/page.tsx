"use client";
import React, { useEffect, useState } from "react";
import iProduct from "@/types/product";
import { useRouter } from "next/navigation";
import Image from "next/image";

function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<iProduct[]>([]);

  // Load cart items from localStorage
  useEffect(() => {
    const value = localStorage.getItem("cart");
    const cart = value ? JSON.parse(value) : {};
    const items = Object.values(cart) as iProduct[]; // Explicitly defining the type
    setCartItems(items);
  }, []);

  // Update cart in localStorage
  const updateCart = (updatedCart: iProduct[]) => {
    const cartObject = updatedCart.reduce(
      (acc, item) => {
        acc[item._id] = item;
        return acc;
      },
      {} as Record<string, iProduct>
    ); // Define a type for accumulator
    localStorage.setItem("cart", JSON.stringify(cartObject));
    setCartItems(updatedCart);
  };

  // Remove product from cart
  const removeProduct = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item._id !== productId);
    updateCart(updatedCart);
  };


  const updateQuantity = (productId: string, quantity: number) => {
    const updatedCart = cartItems.map((item) =>
      item._id === productId
        ? { ...item, quantity: String(Math.max(1, quantity)) } // Use String() to convert to string
        : item
    );
    updateCart(updatedCart);
  };

  const calculateTotal = (): number =>
    cartItems.reduce(
      (total, item) => total + item.price * Number(item.quantity),
      0
    );

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
                  className="flex overflow-hidden items-center bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <Image
                    width={200}
                    height={200}
                    src={item.ProductImage}
                    alt={item.name}
                    className="w-24 h-24 rounded object-cover"
                  />
                  <div className="ml-4 flex-grow">
                    <h2 className="sm:text-lg text-sm font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="sm:text-sm text-xs text-gray-500">{item.categoryName}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Price: PKR {item.price}
                    </p>
                  </div>
                  <div className="flex  gap-2 sm:gap-4 sm:flex-row sm:p-4 p-2 flex-col justify-center items-center">
                  <div className="flex items-center">
                    <button
                      className="sm:px-3 sm:py-1 px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                      onClick={() =>
                        updateQuantity(item._id, Number(item.quantity) - 1)
                      }
                    >
                      -
                    </button>
                    <span className="sm:px-3 sm:py-1 px-2 py-1 border">{item.quantity}</span>
                    <button
                      className="sm:px-3 sm:py-1 px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                      onClick={() =>
                        updateQuantity(item._id, Number(item.quantity) + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="text-sm text-gray-600">
                      Subtotal: PKR {item.price * Number(item.quantity)}
                    </p>
                    <button
                      className="text-red-500 hover:underline text-sm mt-1"
                      onClick={() => removeProduct(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 h-fit rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Items:</span>
                <span className="text-sm text-gray-800">
                  {cartItems.length}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Delivery:</span>
                <span className="text-sm text-gray-800">PKR 90 /-</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Total:</span>
                <span className="text-lg font-bold text-gray-800">
                  PKR {calculateTotal() + 90}
                </span>
              </div>
              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 mt-4"
              >
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
