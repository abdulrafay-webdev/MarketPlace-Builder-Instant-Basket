import React from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../sanity/lib/client";
import { Carousel, CarouselContent, CarouselItem } from "./carousel";

async function Categories() {

const CategoryName = await client.fetch(`*[_type == "category"] {
  _id,
  categoryName,
  description,
  "CategoryImage": image.asset->url,
  "slug":slug.current,
}`)

  return (
    <div className="text-center py-10 container mx-auto overflow-hidden">
      <h2 className="text-3xl font-bold mb-8">Our Categories</h2>
      <div className="flex items-center justify-center sm:gap-8 gap-4">
        {/* category circle  */}
        <Carousel>
  <CarouselContent>
        
        {CategoryName.map((item:any, i:any) => (
          <CarouselItem  key={i} className="md:basis-1/6 lg:basis-1/5 basis-1/6 flex flex-col justify-center items-center w-[20%]">

            <Link href={`/category/${item.slug}`}>
          <div className="w-20 md:w-32 aspect-square rounded-full overflow-hidden bg-gray-200 hover:scale-105 transform transition-all">
            <Image
              src={item.CategoryImage}
              alt="Category Name"
              className="w-full h-full"
              width={500}
              height={500}
            />
           
          </div>
          </Link>
          <div className=" bottom-0 w-full py-2">
              <p className="text-black text-center text-sm md:text-lg font-semibold">
                {item.categoryName}
              </p>
            </div>
        </CarouselItem>
        ))}
        
        </CarouselContent>
        </Carousel>
        {/* next  */}
      </div>
    </div>
  );
}

export default Categories;
