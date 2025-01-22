import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div
  className="hero max-h-[60vh] min-h-[40vh]"
  style={{
    backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
  }}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold">Instant Basket</h1>
      <p className="mb-5">
      InstantBasket offers seamless, real-time shopping with a diverse range of products, delivering convenience, affordability, and exceptional service for every customer
      </p>
      <Link href="/product">
      <button className="btn btn-primary">Buy Now</button>
      </Link>
    </div>
  </div>
</div>
  )
}

export default Hero