import React from "react";
import Image from "next/image";
import Link from "next/link";

function Card(props: {
  slug: string;
  image: string;
  title: string;
  price: number;
  cart: string;
  quantity:string;
  category:string;
}) {

  const domePrice:any = (props.price * 1.2).toFixed(2);

  return (
    <div className="sm:max-w-xs max-w-[48%] my-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <div className="relative">
        <Link href={`/product/${props.slug}`}>
          <Image
            src={props.image}
            alt="Product"
            width={500}
            height={500}
            className="sm:max-w-xs max-w-[100%] aspect-square object-cover rounded-t-lg"
          />
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md">
            -20%
          </span>
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/product/${props.slug}`}>
        <span className="text-sm text-gray-500">
              {props.category}
            </span>
          <h3 className="sm:text-lg text-sm font-semibold text-gray-800 text-ellipsis line-clamp-2">
            {props.title}
          </h3>
          <span className="text-sm text-gray-700">
              ({props.quantity})
            </span>
          <div className="flex items-center mt-2 space-x-2">
            <span className="sm:text-lg text-sm font-bold text-indigo-600">
              PKR {props.price} /-
            </span>
            <span className="text-sm text-gray-500 line-through">
              {domePrice }
            </span>
          </div>
        </Link>
        <div className="flex items-center mt-2">
        
          <span className="ml-1 text-xs text-gray-500">{props.quantity}</span>
        </div>
        <Link href={props.cart}>
          <button className="w-full mt-4 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors">
            Add to Cart
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
