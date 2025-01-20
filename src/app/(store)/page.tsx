import Card from "@/components/shared/Card";
import Categories from "@/components/UI/Categories";
import Hero from "@/components/UI/Hero";
import SingleProduct from "@/components/UI/SingleProduct";


export default async function Home() {
  return (
    <div className="min-h-[70vh]">
     <Hero/>
     {/* <Categories/> */}
     <SingleProduct/>
    </div>
  );
}
