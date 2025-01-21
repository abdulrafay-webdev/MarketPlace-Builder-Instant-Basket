
import { client } from '../../../sanity/lib/client';
import ProductList from '@/components/shared/ProductList';

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
    quantity,
    _id
  }`);

  return (
    <div>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
       
            <ProductList products={products} />
  )}
    </div>
  ); 
}
