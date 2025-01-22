import React from "react";
import { client } from "../../../../sanity/lib/client";
import iProduct from "@/types/product";
import ProductList from "@/components/shared/ProductList";

// Define types for Category and Product
interface Category {
  categoryName: string;
  slug: string;
  CategoryImage: string;
  description: string;
}

export interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function page({ params }: PageProps) {
  const resolvedParams = await params; // Await the promise
  const { slug } = resolvedParams;

  // Fetch Category data with correct types
  const category: Category[] = await client.fetch(
    `*[_type == "category" && slug.current == "${slug}"]{
      categoryName,
      "slug": slug.current,
      "CategoryImage": image.asset->url,
      description
    }`
  );

  // Fetch Product data with correct types
  const product: iProduct[] = await client.fetch(
    `*[_type == "product" && category->slug.current == "${slug}"] {
      name,
      description,
      price,
      "categoryName": category->categoryName,
      sku,
      "slug": slug.current,
      "ProductImage": image.asset->url,
      quantity,
      _id
    }`
  );

  return (
    <div className="min-h-[80vh]">
      {/* ui design */}
      {category.map((item: Category, i: number) => (
        <div
          key={i}
          className="hero max-h-[40vh] min-h-[20vh]"
          style={{
            backgroundImage: `url(${item.CategoryImage})`,
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content text-neutral-content text-center">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">{item.categoryName}</h1>
              <p className="mb-5">{item.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* products category wise */}
      <div>
        <ProductList products={product} />
      </div>
    </div>
  );
}

export default page;
