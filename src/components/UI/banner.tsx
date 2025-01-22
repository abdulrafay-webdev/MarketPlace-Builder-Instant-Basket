import Image from 'next/image'
import React from 'react'
import img from '../../../public/images/INSTANT BASKET.jpg'
import Link from 'next/link'

function Banner() {
  return (
    <div className='container mx-auto lg:px-20 sm:px-10 px-2 py-5'>
        <Link href={'/category/vegetable'}>
        <Image className='' src={img} alt='banner'/>
        </Link>
    </div>
  )
}

export default Banner