// Default value is an empty string
//   


// });
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
  rating: { type: Number, default: 3.7 }})

// Create a model based on the schema
const ProductModel = mongoose.model("Product1", productSchema);

const getProductUrl = (product_id) =>
`https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=dell%252B5420%252Blaptop%25252Caps%25252C331&crid=65EZDFTOUAMS&keywords=dell%252B5420%252Blaptop&dib_tag=se&dib=eyJ2IjoiMSJ9.qOcYrdkAA4ldW_-AxVJ9gCymEhK6RupyjsV8emOxfK6PCXQtvd6PV3Z_KKcVDuLRDT-b6Z7PpTF-NTdQDbuzvT6nukhQ1MesEMma32adG13lGUmrV8d8lKW3tllLY3g-oBHgIp8so10cSi27PSK6VoaBq9aQJ8BcCK6GAWVh7nK5Nvp80BeO1Ws_Hm2Eqf-_-Bt9idpWwWVmlQ_Hy7_9eWSrG-IL7kBrLuhQj3WNMCY.pUsbWWVwodPXFQNcTS-QfYezqtFDFgxEJJZYDQ64Fjw&sr=8-2&rrid=RCMJ5M38VQ80YXA75HX8&experienceId=aodAjaxMain`;

async function getPrices(product_id) {
  try {
    const productUrl = getProductUrl(product_id);
    const { data } = await axios.get(productUrl, {
      headers: {
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,/;q=0.8",
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

    const result = {
      pinnedElement: $("#aod-asin-block-asin").textContent.trim(),
      price,
      pinnedShippedFrom,
    };
    const cleanedPrice = parseFloat(result.price.replace(/[^\d.]/g, ''));
    const priceFloat = cleanedPrice;
    const image = $("#pinned-image-id img").getAttribute("src");
    const normalizedData = {
      description: result.pinnedElement.replace(/\s+/g, " "),
      price: priceFloat, // Add the dollar sign and fix to 2 decimal places
      pinnedShippedFrom: result.pinnedShippedFrom.replace(/\s+/g, " "),
      title: result.pinnedElement.split("-")[0].trim(),
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

    console.log(
      "Application is successfully connected to MongoDB database (7th)"
    );

    // Call the function to get prices and store data in MongoDB
    await getPrices("B09GPT1GP1");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

// Call the connectToDatabase function to start the process
connectToDatabase();