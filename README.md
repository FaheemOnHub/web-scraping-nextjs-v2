# Price-Analyzer: Advanced Amazon Web Scraper

**Price-Analyzer** is a cutting-edge Amazon web scraper designed to extract and monitor detailed product data, including price fluctuations, from Amazon listings. This tool is perfect for developers, data analysts, and e-commerce enthusiasts who want to stay ahead of price trends and make informed purchasing decisions.

## 🚀 Features

- **Comprehensive Data Extraction**: Scrapes product titles, prices, images, availability status, and more from Amazon product pages.
- **Price History Tracking**: Maintains a detailed history of price changes, allowing you to analyze trends over time.
- **Automated Price Alerts**: Sends email notifications when significant price changes are detected, ensuring you never miss a deal.
- **Scheduled Data Updates**: Leverages cron jobs to automatically update product data and price information at regular intervals.

## 🛠️ Tech Stack

- **Frontend**: Built with **Next.js** and **React** for a dynamic, responsive UI.
  - Components include a hero carousel, search bar, and product cards.
  - **Image Optimization**: Utilizes the Next.js `Image` component for fast and optimized image rendering.

- **Backend**: Powered by **Node.js** and **Express**, with data management via **MongoDB**.
  - **Web Scraping**: Utilizes **Axios** and **Cheerio** for efficient data extraction from Amazon pages.
  - **Data Processing**: Custom utilities for price extraction, category identification, and currency conversion.
  - **Email Notifications**: Integrated with **Resend** to send alerts based on price changes.

- **Database**: **MongoDB** is used to store product data, price history, and user information securely.
  - **Mongoose** is employed for schema modeling and data validation.

- **Proxy Handling**: Incorporates **BrightData** proxy for reliable and anonymous scraping.

## 📦 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/price-analyzer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd price-analyzer
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

4. Configure your environment variables in a `.env` file:

   ```env
   username=your-brightdata-username
   password=your-brightdata-password
   host=your-brightdata-host
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

## 📝 Usage

1. **Add Products**: Enter Amazon product URLs into the system to start tracking.
2. **View Data**: Use the frontend interface to explore product details and monitor price trends.
3. **Set Alerts**: Configure email notifications for price changes to stay updated on deals.

## 🔄 Contributing

Contributions are welcome! If you have suggestions for new features, improvements, or bug fixes, feel free to open an issue or submit a pull request. Your input helps make **Price-Analyzer** better for everyone.
