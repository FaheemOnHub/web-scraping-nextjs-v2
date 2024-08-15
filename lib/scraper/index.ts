import dotenv from "dotenv";
import axios from "axios";
import * as cheerio from "cheerio";
import { extractPrice, getCategory, getCurrencySymbol } from "./utils";

dotenv.config();
const prices: any[] = [];
export async function scrapeAmazonProduct(productUrl: string) {
  if (!productUrl) return;
  //brightdata proxy configuration
  const username = process.env.username;
  const password = process.env.password;
  const host = process.env.host;
  const port = 22225;
  const sessionId = 1000000 * Math.random() || 0;
  const option = {
    auth: {
      username: `${username}-session-${sessionId}`,
      password,
    },
    host,
    port,
    rejectUnauthorized: false,
  };
  try {
    //fetch product page
    const response = await axios.get(productUrl);
    const $ = cheerio.load(response.data);

    let symbol = getCurrencySymbol(productUrl);
    const title = $("#productTitle").text().trim();

    //cateogry
    const category = await getCategory($);
    // Extract discounted prices
    const discountedPriceElements =
      $(".priceToPay .a-price-whole") ||
      $(".a.size.base.a-color-price") ||
      $(".a-button-selected .a-color-base ");
    const discountedPriceFractionElements = $(".priceToPay .a-price-fraction");
    // Add discounted prices
    discountedPriceElements.each((i, el) => {
      const whole = $(el).text().trim();

      const fraction = $(discountedPriceFractionElements[i]).text().trim();
      // const price = parseFloat(whole + (fraction ? "." + fraction : ""));
      const price = parseInt(whole.replace(/[^0-9.-]+/g, ""));

      prices.push(price);
    });

    const minPrice = Math.min(...prices);
    const outOfStock =
      $("#availability span").text().trim().toLowerCase() ===
      "currently unavailable";
    const image =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      $(".a-dynamic-image").attr("data-a-dynamic-image") ||
      "{}";
    const imageUrls = Object.keys(JSON.parse(image));
    const formattedPrice = `${symbol}${minPrice}`;
    const discountPercentage = $(".savingsPercentage")
      .text()
      .replace(/[-%]/g, "");
    // console.log({
    //   title,
    //   priceInfo: formattedPrice,
    //   outOfStock,
    //   imageUrls,
    //   discountPercentage,
    // });

    //CONSTRUCT DATA OBJECT WITH SCRAPED DATA
    const data = {
      url: productUrl,
      currency: symbol,
      image: imageUrls[0],
      title,
      currentPrice: minPrice,
      originalPrice: minPrice,
      priceHistory: [],
      discountRate: Number(discountPercentage),
      category: category || "Uncategorized",
      reviewCount: 0,
      stars: 0,
      isOutOfStock: outOfStock,
      description: "to-be-added",
      lowestPrice: 0,
      highestPrice: 0,
      averagePrice: 0,
    };
    return data;
  } catch (error: any) {
    throw new Error("failed to send a message");
  }
}
