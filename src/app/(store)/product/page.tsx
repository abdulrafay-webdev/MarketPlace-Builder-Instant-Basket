
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductsPage() {
  // Data fetched on the server
  const products = await client.fetch(`*[_type == "product"]{
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
      <h1>Products</h1>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div>
          {products.map((product:any, index:any) => (
            <div key={index}>
              <Link href={`/product/${product.slug}`}>
              <h2>{product.name}</h2>
              </Link>
              <p>{product.description}</p>
              <p>Price: {product.price}</p>
              <p>Category: {product.categoryName}</p>
              <p>Category: {product.slug}</p>
              <p>{product.ProductImage}</p>
              <Image src={product.ProductImage} alt={product.name} width={1000} height={1000}/>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
