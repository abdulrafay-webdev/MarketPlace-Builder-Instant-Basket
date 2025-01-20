import Image from 'next/image'
import React from 'react'
import img from '../../../public/images/golden light 2.jpg'

function SingleProduct(props:{price:number,title:string,image:string,description:string}) {
    const domePrice:any = (props.price * 1.2).toFixed(2);
  return (
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
    {/* image  */}
      <Image
        alt={props.title}
        className="lg:w-1/2 aspect-square w-full lg:h-auto  object-cover object-center rounded"
        src={props.image}
        width={700}
        height={700}
      />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0  flex flex-col gap-2 xl:gap-7">
      {/* category  */}
        <h2 className="text-sm title-font text-gray-500 tracking-widest">
          {props.category}
        </h2>
        {/* title  */}
        <h1 className ="text-gray-900 text-3xl title-font font-medium mb-1">
          {props.title}
        </h1>
        {/* description  */}
        <p className="leading-relaxed">
        {props.description}
        </p>
        {/* price  */}
        <div>
        <span className="title-font font-medium text-2xl text-gray-900">
           {props.price}
          </span>
        <span className="title-font font-medium text-2xl text-gray-900 line-through">
            {domePrice}
          </span>
          </div>
          {/* button  */}
        <div className="flex gap-2 justify-between">
        <button className=" text-white w-full bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            Buy Now
          </button>
          <button className=" text-white w-full bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SingleProduct