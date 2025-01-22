'use client'
import iProduct from '@/types/product';
import React from 'react'

function page() {

  const value = localStorage.getItem("cart");
    const cart = value ? JSON.parse(value) : {};
    const items = Object.values(cart) as iProduct[];
    console.log(items)


  return (
    <div className='min-h-screen'>checkout page
    {items.map((item) => (
      <div key={item._id}>
<h1>{item._id}</h1>
<h2>{item.categoryName}</h2>
      </div>
       ))}
    </div>
  )
}

export default page