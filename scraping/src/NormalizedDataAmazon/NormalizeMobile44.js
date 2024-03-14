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
  rating: { type: Number, default: 4.3 }
});

// Create a model based on the schema
const ProductModel = mongoose.model("Product1", productSchema);

const getProductUrl = (product_id) =>
  ` https://www.amazon.com/gp/product/ajax/?asin=B097CN57TH&pc=sp&sprefix=samsung%25252Bgalaxy%25252Bz%25252Bflip%25252B3%25252Caps%25252C323&crid=17ZGY95022OCJ&keywords=samsung%252Bgalaxy%252Bz%252Bflip%252B3&dib_tag=se&dib=eyJ2IjoiMSJ9.PsJ21t6wq4OyAv_P83cd9wVG5WH4T6_cgqjQYMtnKjrcXBvjtALbNXHKFGXhm1f9J3_7vvbKYgWQmav3zlNpaxRtPVUa6PpD_eK_ssc4oJAc1s2nM7O5pNl721zl4qN6aijg1yvhLdP6xWYyuUnjpfR1ou7RW08wZC_M7EwJ70fAunUhqFROKGdxxdI9-abzrQYueyx3bmiGqC-NucqxVr8WzAvy_FI3qFQHDdTqGNA.KZxU-cagR2quw15UReZrR0VXrvSWsXPTnxC0i8FrdWo&sr=8-1&rrid=Q224WRHHNAQXTGATM6D6&experienceId=aodAjaxMain`;

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
    await getPrices("B097CN57TH");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Call the connectToDatabase function to start the process
connectToDatabase();















  
  
  