'use client'
import iProduct from '@/types/product';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

interface ProductListProps {
  products: iProduct[]; // Ensure products is an array of iProduct
}

function SingleProduct({ products }: ProductListProps) {

   const [showCartButton, setShowCartButton] = useState(false);
    const router = useRouter();


    const handleClick = (product: iProduct) => {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
  
      if (cart[product.name]) {
        cart[product.name] = {
          ...cart[product.name],
          quantity: cart[product.name].quantity + 1,
        };
      } else {
        cart[product.name] = { ...product, quantity: 1 };
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      setShowCartButton(true);
  
      // Show toast notification
      toast.success(`${product.name} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };


  return (
  <div className="container px-5 lg:py-24 sm:py-10 mx-auto">
    {products.map((product: iProduct) => {
    const domePrice:string = (product.price * 1.2).toFixed(2);
            return (
    <div key={product._id} className="lg:w-4/5 gap-3  justify-center mx-auto  flex flex-wrap">
    {/* image  */}
      <Image
        alt={product.name}
        className="md:w-2/5 md:border-0 border-2 aspect-square w-full lg:h-auto  object-cover object-center rounded"
        src={product.ProductImage}
        width={700}
        height={700}
      />
      <div className="md:w-2/5 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0  flex flex-col gap-2 xl:gap-7">
      {/* category  */}
        <h2 className="text-sm title-font text-gray-500 tracking-widest">
          {product.categoryName}
        </h2>
        {/* title  */}
        <h1 className ="text-gray-900 text-3xl title-font font-medium mb-1">
          {product.name}
        </h1>
        {/* quantity  */}
        <h1 className ="text-gray-900 text-xl title-font font-medium mb-1">
          ({product.quantity})
        </h1>
        {/* description  */}
        <p className="leading-relaxed">
        {product.description}
        </p>
        {/* price  */}
        <div className='flex gap-4'>
        <span className="title-font font-medium text-2xl text-gray-900">
           PKR {product.price} /-
          </span>
        <span className="title-font font-medium text-xl text-gray-700 line-through">
            {domePrice}
          </span>
          </div>
          {/* button  */}
        <div className="flex gap-2 justify-between">
          <button onClick={() => handleClick(product)} className=" text-white w-full bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
    );
  })}
        {showCartButton && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={() => router.push("/cart")}
            className="px-6 py-3 text-sm font-semibold text-white bg-green-600 rounded-md shadow-lg hover:bg-green-700 transition-colors"
          >
            View Cart
          </button>
        </div>
      )}
  </div>
  )
}

export default SingleProduct