const axios = require("axios");
const { JSDOM } = require("jsdom");
const mongoose = require("mongoose");

// Define the schema for your product data
const productSchema = new mongoose.Schema({
  description: String,
  price: Number,
  pinnedShippedFrom: String,
  title: String,
  category: { type: String, default: "Mobile" },
  image: String,
  rating: { type: Number, default: 5 }
});

// Create a model based on the schema
const ProductModel = mongoose.model("Product1", productSchema);

const getProductUrl = (product_id) =>
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=nokia%252Bc300%25252Caps%25252C386&crid=28WL4QHNCWAAN&keywords=nokia%252Bc300%252Bunlocked%252Bphone&dib_tag=se&dib=eyJ2IjoiMSJ9.m1jKGpm5FD6YijC4FVy0fHAudAQyqcCH1fug4GpotDrG6andctguGcDzPrAZJzTo1D_0x7yZ2gQBuP84KN8KKVEyb-s44GGqWkuymW4Zr1JOS73H9fRT2zfUoyDWRV9gldsIwTq5MrPjx70n5UFDjhTcS3LMLFcDfa5Xtiyz8n6D30rKBUTmXGJcnP2W3PIDbg0KAkC6XBjnLrZF-3pnKpAngUqHQd6KQie2lxwVMfI.N5Snc6iJQFIh3O5-YaDgKCtesOwDnFwurZjBU4piS8I&sr=8-1&rrid=TAXXMPVTQ1SZWXSZ0FNH&experienceId=aodAjaxMain`

async function getPrices(product_id) {
  try {
    const productUrl = getProductUrl(product_id);
    const { data } = await axios.get(productUrl, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
        Host: "www.amazon.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        Pragma: "no-cache",
        TE: "Trailers",
        "Upgrade-Insecure-Requests": 1,
      },
    });

    const dom = new JSDOM(data);
    const $ = (selector) => dom.window.document.querySelector(selector);

    const price = dom.window.document.querySelector(".a-offscreen").textContent;
    const pinnedShippedFrom = $("#aod-offer-shipsFrom").textContent.trim();
    const image = $("#pinned-image-id img").getAttribute("src");
    const result = {
      pinnedElement: $("#aod-sticky-pinned-offer").textContent.trim(),
      price,
      pinnedShippedFrom,
      image
      
    };

    const cleanedPrice = parseFloat(result.price.replace(/[^\d.]/g, ''));
    const priceFloat = cleanedPrice;
   
    const normalizedData = {
      title: result.pinnedElement.split(",")[0].trim() + ", " + result.pinnedElement.split(",")[1].trim(),
      price: priceFloat,
      description: result.pinnedElement.replace(/\s+/g, ' '),
      pinnedShippedFrom: result.pinnedShippedFrom.replace(/\s+/g, ' '),
      image: image
        
    };
    // Save the result to MongoDB
    const newProduct = new ProductModel(normalizedData);
    await newProduct.save();

    console.log("Data saved to MongoDB:", normalizedData);
  } catch (error) {
    console.error("Error getting prices:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Use the connectToDatabase function to establish a connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/7th", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Application is successfully connected to MongoDB database (7th)");

    // Call the function to get prices and store data in MongoDB
    await getPrices("B0C92C436C")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};


connectToDatabase();

