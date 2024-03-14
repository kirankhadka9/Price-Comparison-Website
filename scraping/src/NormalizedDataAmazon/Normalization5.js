const axios = require("axios");
const { JSDOM } = require("jsdom");
const mongoose = require("mongoose");

// Define the schema for your product data
const productSchema = new mongoose.Schema({
  description: String,
  price: Number,
  pinnedShippedFrom: String,
  title: String,
  category: { type: String, default: "Laptop" },
  image: String,
  rating: { type: Number, default: 4.4}
});

// Create a model based on the schema
const ProductModel = mongoose.model("Product1", productSchema);

const getProductUrl = (product_id) =>
  ` https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&rnid=2528832011&s=electronics&sprefix=%25252Caps%25252C387&crid=1ATKD2T3PB721&keywords=laptop&dib_tag=se&dib=eyJ2IjoiMSJ9.ev7jXSll-J-BnI7TaNVceET4atttSBvPw5oo1BbeNSf2zElT71t_XxHXchY3vb92I-XQNIl9cK6_IFKeWpH9zdNS_YIMBjuldJZTUWwhLnwKSG7_elliKie07P7Wf4qhJSHmF6ml6wUa1CJi31U-27O3HV36qHWw0Fb8vdL993vXrQQqiWPkjj-xFxhuLgTmE44-hybYVzLKV7z4z1zLvOYcZCRFohhRyynDPoMXn_6Eh7i1hT2oqFoGKXpGeOv89zSKHfntV3LDl-cQpOZOtItn4_7el3nKQRVBZHOfsLo.OaV_V_XqJhu1YVHmc3oGrzXoOBUaPMgsoG2hcrTWm-A&refinements=p_89%25253AAlienware%25257CMicrosoft&sr=1-3&rrid=KFR6C0Z9KJ6ARV80VD7C&experienceId=aodAjaxMain`;

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
      title: result.pinnedElement.split("-")[0].trim() + "- " + result.pinnedElement.split("-")[1].trim(),
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
    await getPrices("B0C5MSQLRG");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Call the connectToDatabase function to start the process
connectToDatabase();

