import Card from "@/components/Card";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { Product } from "@/types";
import { redirect } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Modal from "@/components/Modal";

type Props = {
  params: { id: string };
};
const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);
  const similarProducts = await getSimilarProducts(id);

  if (!product) {
    redirect(`/`);
  }

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            height={1}
            width={480}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  height={20}
                  width={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">
                  {product.reviewCount}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/bookmark.svg"
                  alt="bookmark"
                  height={20}
                  width={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src="/assets/icons/share.svg"
                  alt="share"
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info ">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product.currency}
                {product.currentPrice}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product.currency}
                {product.originalPrice}
              </p>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src="/assets/icons/star.svg"
                    alt="stars"
                    height={16}
                    width={16}
                  />
                  <p className="text-sm text-primary-orange">
                    {product.stars || "5"}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    src="/assets/icons/comment.svg"
                    alt="comment"
                    height={16}
                    width={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product.reviewCount} Reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span>of
                buyers have recommend this
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <Card
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product.currency}${product.currentPrice}`}
                borderColor="#be6dbff"
              />
              <Card
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product.currency}${product.averagePrice}`}
                borderColor="#be6dbff"
              />
              <Card
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product.currency}${product.highestPrice}`}
                borderColor="#be6dbff"
              />
              <Card
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product.currency}${product.lowestPrice}`}
                borderColor="#be6dbff"
              />
            </div>
          </div>
          <Modal productId={id} />
        </div>
      </div>
      <div className="flex flex-col gap-16 ">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">
            Product Description
          </h3>
          <div className="flex flex-col gap-4">
            {product.description?.split("\n")}
          </div>
        </div>
        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
            src="/assets/icons/bag.svg"
            alt="buy-now"
            height={22}
            width={22}
          />
          <Link href={"/"} className="text-base text-white">
            Buy Now 🎒
          </Link>
        </button>
      </div>
      {similarProducts && similarProducts.length > 0 && (
        <div className="py-14 flex flex-col gap-4 w-full ">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts?.map((item) => (
              <ProductCard key={item._id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
