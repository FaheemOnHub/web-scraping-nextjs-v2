import HeroCarousel from "@/components/HeroCarousel";
import Searchbar from "@/components/Searchbar";
import Image from "next/image";
import React from "react";
import { getAllProducts } from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
const Home = async () => {
  const allProducts = await getAllProducts();
  const renderProducts = () => {
    return allProducts?.map((item) => (
      <ProductCard key={item._id} product={item} />
    ));
  };
  return (
    <>
      <section className="px-6 md:px-20 py-24  ">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart shopping starts here:
              <Image
                src="/assets/icons/arrow-right.svg"
                width={16}
                height={16}
                alt="arrow-right"
              ></Image>
            </p>
            <h1 className="head-text">
              Unleash the power of{" "}
              <span className="text-primary">Price-Analyzer</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you
              convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
          <HeroCarousel />
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {/* {allProducts?.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))} */}
          {renderProducts()}
        </div>
      </section>
    </>
  );
};

export default Home;
