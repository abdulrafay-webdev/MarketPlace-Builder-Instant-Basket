import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { Carousel, CarouselContent, CarouselItem} from "./carousel";
import { Button } from "./button";

// Define the structure of the category data using TypeScript interface
interface Category {
  _id: string;
  categoryName: string;
  description: string;
  CategoryImage: string;
  slug: string;
}

async function Categories() {
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
    <div className="text-center py-10 container mx-auto overflow-hidden">
      <div className="flex justify-around  mb-8">
      <h2 className="text-3xl font-bold">Our Categories</h2>
      <Button><Link href={'/category'}>view all</Link></Button>
      </div>
      <div className="flex items-center justify-center sm:gap-8 gap-4">
        {/* Category Circle Carousel */}
        <Carousel>
          <CarouselContent>
            {CategoryName.map((item) => (
              <CarouselItem
                key={item._id}
                className="md:basis-1/6 lg:basis-1/5 basis-1/6 flex flex-col justify-center items-center w-[25%]"
              >
                <Link href={`/category/${item.slug}`}>
                  <div className="w-20 md:w-32 aspect-square rounded-full overflow-hidden bg-gray-200 hover:scale-105 transform transition-all">
                    <Image
                      src={item.CategoryImage}
                      alt={item.categoryName}
                      className="w-full h-full"
                      width={500}
                      height={500}
                    />
                  </div>
                </Link>
                <div className="bottom-0 w-full py-2">
                  <p className="text-black text-center text-sm md:text-lg font-semibold">
                    {item.categoryName}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}

export default Categories;
