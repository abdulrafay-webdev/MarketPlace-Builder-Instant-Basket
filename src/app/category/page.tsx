import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";

// Define the structure of the category data using TypeScript interface
interface Category {
  _id: string;
  categoryName: string;
  description: string;
  CategoryImage: string;
  slug: string;
}





const CategoriesPage = async() => {

    // Fetch category data from Sanity CMS
    const CategoryName: Category[] = await client.fetch(
      `*[_type == "category"] {
        _id,
        categoryName,
        description,
        "CategoryImage": image.asset->url,
        "slug":slug.current
      }`
    );


  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Categories
      </h1>
      <div className="container mx-auto px-4">
        <div className="grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {CategoryName.map((item) => (
          <Link key={item._id} href={`/category/${item.slug}`}>
            <div
              className="relative group bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <Image
                src={item.CategoryImage}
                width={500}
                height={500}
                alt={item.categoryName}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-white bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-black text-lg hidden md:flex font-semibold">{item.categoryName}</p>
              </div>
              <p className="text-black text-center flex py-2 justify-center md:hidden text-lg  font-semibold">{item.categoryName}</p>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
