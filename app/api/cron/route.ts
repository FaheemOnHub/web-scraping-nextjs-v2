"use server";
import Product from "@/lib/models/products.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodeMailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import {
  getAveragePrice,
  getEmailNotifType,
  getHighestPrice,
  getLowestPrice,
} from "@/lib/scraper/utils";
import { NextResponse } from "next/server";

const maxDuration = 300;
const dynamic = "force-dynamic";
const revalidate = 0;

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find({});
    if (!products || products.length === 0)
      throw new Error("No products found");

    const updatedProducts = await Promise.all(
      products.map(async (current) => {
        const scrapedProduct = await scrapeAmazonProduct(current.url);
        if (!scrapedProduct) return null;

        const updatedPriceHistory = [
          ...current.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const newProduct = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        const updatedProduct = await Product.findOneAndUpdate(
          { url: newProduct.url },
          newProduct,
          { new: true }
        );

        // Check item status & send email
        const emailNotify = getEmailNotifType(scrapedProduct, current);
        if (
          emailNotify &&
          updatedProduct.users &&
          updatedProduct.users.length > 0
        ) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          const emailContent = await generateEmailBody(
            productInfo,
            emailNotify
          );
          const userEmails = updatedProduct.users.map(
            (user: any) => user.email
          );

          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    const filteredProducts = updatedProducts.filter(
      (product) => product !== null
    );

    return NextResponse.json({
      message: "OK",
      data: filteredProducts,
    });
  } catch (error: any) {
    console.error(`Error in GET cron job: ${error.message}`);
    return NextResponse.json(
      {
        message: "Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
