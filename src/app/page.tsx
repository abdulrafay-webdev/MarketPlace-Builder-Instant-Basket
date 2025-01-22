import Categories from "@/components/UI/Categories";
import Hero from "@/components/UI/Hero";
import { client } from "../../sanity/lib/client";
import ProductList from "@/components/shared/ProductList";
import iProduct from "@/types/product";

export default async function Home() {
  const data = await client.fetch(`*[_type == "product"] | order(_createdAt desc) [0...30]{
    name,
    description,
    price,
    "categoryName": category->categoryName,
    sku,
    "slug": slug.current,
    "ProductImage": image.asset->url,
    quantity,
    _id
}`);

  const products: iProduct[] = data; // `data` ko directly array assume kar rahe hain

  return (
    <div className="min-h-[70vh]">
      <Hero />
      <Categories />
      <h2 className="text-3xl text-center font-bold mb-8">Latest Products</h2>

      <ProductList products={products} />
      </div>
  );
}
