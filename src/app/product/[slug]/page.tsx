import Image from 'next/image';
import React from 'react'
import SingleProduct from "@/components/UI/SingleProduct";
import { client } from '../../../../sanity/lib/client';


export interface PageProps {
    params: Promise<{
      slug: string;
    }>;
  }

  export default async function page({params}:PageProps) {


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
}`);
  return (
    <div>
              {singleProduct.map((product:any, index:any) => (

                // <div key={index}>
                //   <h2>{product.name}</h2>
                //   <p>{product.description}</p>
                //   <p>Price: {product.price}</p>
                //   <p>Category: {product.categoryName}</p>
                //   <p>Category: {product.slug}</p>
                //   <p>{product.ProductImage}</p>
                //   <Image src={product.ProductImage} alt={product.name} width={1000} height={1000}/>



<SingleProduct key={index} category={product.categoryName} price={product.price} title={product.name} description={product.description} image={product.ProductImage} />

                // </div>
              ))}
                </div>
  )
}

