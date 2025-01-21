"use client";
import iProduct from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import { json } from "stream/consumers";

interface ProductListProps {
  products: iProduct[]; // Ensure products is an array of iProduct
}

function ProductList({ products }: ProductListProps) {
  // const domePrice:any = (products.price * 1.2).toFixed(2);

  const handleclick = (product: iProduct) => {
    // console.log(product)
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    if (cart[product.name]) {
      cart[product.name] = {
        ...cart[product.name],
        quantity: cart[product.name].quantity + 1,
      };
    } else {
      cart[product.name] = {...product, quantity: 1};
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // const jsonCart = JSON.stringify(product); 
    // localStorage.setItem('cart', jsonCart);
  };

  return (
    <div className="flex flex-wrap container mx-auto justify-center">
      {products.map((product: iProduct) => {
        return (
          <div
            key={product._id}
            className="sm:max-w-xs max-w-[46%] my-4 sm:mx-4 mx-[2%] bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-md transition-shadow duration-300"
          >
            <div className="relative">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.ProductImage}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="sm:max-w-xs max-w-[100%] aspect-square object-cover rounded-t-lg"
                />
                <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
                  -20%
                </span>
              </Link>
            </div>

            <div className="p-4">
              <Link href={`/product/${product.slug}`}>
                <span className="text-sm text-gray-500">
                  {product.categoryName}
                </span>
                <h3 className="sm:text-lg text-sm font-semibold text-gray-800 text-ellipsis line-clamp-2">
                  {product.name}
                </h3>
                <span className="text-sm text-gray-700">
                  ({product.quantity})
                </span>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="sm:text-lg text-sm font-bold text-indigo-600">
                    PKR {product.price} /-
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {/* {domePrice } */}
                  </span>
                </div>
              </Link>
              <div className="flex items-center mt-2"></div>
              <button
                onClick={() => handleclick(product)}
                className="w-full mt-4 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
