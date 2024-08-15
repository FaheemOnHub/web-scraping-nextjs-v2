"use client";
import { getAllProducts, scrapeAndStoreProduct } from "@/lib/actions";
import { error } from "console";
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const isValidAmazonProductURL = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    //check if hostname contains amazon.com or other amazon.in
    if (
      hostname.includes("amazon.com") ||
      hostname.includes("amazon.") ||
      hostname.endsWith("amazon")
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const Searchbar = () => {
  const router = useRouter();
  const [searchPrompt, setsearchPrompt] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValidLink = isValidAmazonProductURL(searchPrompt);

    if (!isValidLink) {
      alert("Invalid Link ❌");
      return;
    }
    try {
      setisLoading(true);
      //scrape our product page
      const product = await scrapeAndStoreProduct(searchPrompt);
      if (product) {
        // Redirect to the product page
        router.push(`/products/${product._id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };
  return (
    <form className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchPrompt}
        onChange={(e) => {
          setsearchPrompt(e.target.value);
        }}
        placeholder="Enter Product Link"
        className="searchbar-input"
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default Searchbar;
