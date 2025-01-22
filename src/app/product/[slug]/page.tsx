import React from 'react'
import SingleProduct from "@/components/UI/SingleProduct";
import { client } from '../../../../sanity/lib/client';
import iProduct from '@/types/product';


export interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function page({ params }: PageProps) {


  const resolvedParams = await params; // Await the promise
  const { slug } = resolvedParams;


  const singleProduct = await client.fetch(`*[_type == "product" && slug.current == "${slug}"]{
  name,
  description,
  price,
  "categoryName": category->categoryName,
  sku,
 "slug":slug.current,
    "ProductImage": image.asset->url,
    _id,
    quantity
}`);
  const products: iProduct[] = singleProduct; // `data` ko directly array assume kar rahe hain
  return (
    <div className='py-5'>
      <SingleProduct products={products} />
    </div>
  )
}

