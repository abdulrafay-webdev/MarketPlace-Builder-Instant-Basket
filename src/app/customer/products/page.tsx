import { client } from '@/sanity/lib/client';
import { promises } from 'dns';
import { getStaticProps } from 'next/dist/build/templates/pages'
import React from 'react'

async function getServerSideProps() {
    const products = await client.fetch(`*[_type == "product"]{
  name,
  description,
  price,
  "categoryName": category->categoryName,  // Dereference kar ke category ka name fetch karenge
  sku,
  slug,
  image {
    asset->{
      _id,
      url
    }
  }
}
`); // Always fetch fresh data on each request
    return {
      props: { products },
    };
  }

async function page({products}:any) {
  return (
    <div>
        hello
    </div>
  )
}

export default page