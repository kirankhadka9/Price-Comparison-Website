
 
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
  `https://www.amazon.com/gp/product/ajax/?asin=${product_id}&pc=sp&sprefix=samsung%252Bgalaxy%252Bs10%25252Caps%25252C390&crid=2MMNZFZMQSJDH&keywords=samsung%252Bgalaxy%252Bs10&dib_tag=se&dib=eyJ2IjoiMSJ9.B_LQnqRq4t1Knt5KSeCxlthSy7aYcMbt9CQqJd824uBoRh2Ijtur9hKRVkvlW6kVpo0DOZI0qMUzwb2EOMtrtcfdyrQOIoGKU47AyEhG0r6IORQYl_Ll1yyQqWRjxvs7gh8fdzGudMK2UCv53VXOjXXsSNmDRDe30yfJLMC2LBhb4Ea7M8bGKVNS0FhO9OnacoKzL3TZIvqoqQMOeJHuHCagXmCsSSPfHB6WUDIRxds.Xg0UGfDnY2CWChAUl9mnpB8JdrgIbPjEWQrxP3AzuAc&sr=8-1&rrid=VDYKNP8PT1PBST8BVD1M&experienceId=aodAjaxMain`
  
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
      await getPrices("B08FYW5ZDZ");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
  
  
  connectToDatabase();
  
  

