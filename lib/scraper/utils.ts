import { PriceHistoryItem, Product } from "@/types";
import { Notification, THRESHOLD_PERCENTAGE } from "../nodeMailer";
export const extractPrice = (...elements: any) => {
  for (const element of elements) {
    const priceText = element.text().trim();
    if (priceText) {
      return priceText.replace(/\D/g, "");
    }
  }
  return "";
};
export function getCurrencySymbol(website: string): string {
  try {
    // Define a mapping of Amazon domains to their currency symbols
    const currencyMap: { [key: string]: string } = {
      "www.amazon.com": "$", // United States Dollar
      "www.amazon.co.uk": "£", // British Pound
      "www.amazon.de": "€", // Euro
      "www.amazon.fr": "€", // Euro
      "www.amazon.co.jp": "¥", // Japanese Yen
      "www.amazon.in": "₹", // Indian Rupee
      "www.amazon.ca": "$", // Canadian Dollar
      "www.amazon.com.br": "R$", // Brazilian Real
      "www.amazon.com.mx": "$", // Mexican Peso
      "www.amazon.com.au": "$", // Australian Dollar
      "www.amazon.nl": "€", // Euro
      "www.amazon.se": "kr", // Swedish Krona
      "www.amazon.pl": "zł", // Polish Zloty
    };

    // Extract the domain from the website URL
    const url = new URL(website);
    const domain = url.hostname;
    console.log(domain);
    // Return the corresponding currency symbol or a default message
    return currencyMap[domain] || "Currency symbol not found";
  } catch (error) {
    console.log(error);
    return "";
  }
}
export function getHighestPrice(priceList: PriceHistoryItem[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);
  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}

export async function getCategory(cheerio: any) {
  try {
    const breadcrumb = cheerio("#wayfinding-breadcrumbs_feature_div");

    if (breadcrumb.length) {
      // Extract the category links from the breadcrumb
      const categoryLinks = breadcrumb.find("a");

      // Get the last category link (the current category)
      const currentCategory = categoryLinks.last().text().trim();

      return currentCategory;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching product category:", error);
    return null;
  }
}
export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};
