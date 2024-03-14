const axios = require("axios");
const { JSDOM } = require("jsdom");
const mongoose = require("mongoose");

// Define the schema for your Target product data
const targetProductSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  category: { type: String, default: "Mobile" },
  image: { type: String, default: "" }, 
  rating: { type: Number, default: 0 }
});

// Create a model based on the schema for Target product
const ProductModel = mongoose.model("Product2", targetProductSchema);
const targetUrl =
  "https://www.target.com/p/tracfone-prepaid-motorola-moto-g-stylus-64gb-cdma-blue/-/A-90608852#lnk=sametab";
  
  function getTextAfter(text, str) {
    const regex = new RegExp(`${text}(.*?)(?:,|<\/.*?>)`);
    const match = regex.exec(str);
    const extractedText = match ? match[1].trim() : null;
  
    // Remove unwanted characters around the price
    const cleanedText = extractedText ? extractedText.replace(/[^0-9.,]+/g, "") : null;
  
    return cleanedText;
  }
  
  function getTextBetweenTags(tag, str) {
    const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`);
    const match = regex.exec(str);
    return match ? match[1].trim() : null;
  }
  function getDescription(htmlString) {
    const dom = new JSDOM(htmlString);
    const $ = dom.window.document.querySelector.bind(dom.window.document);
  
    // Find the element containing the description
    const descriptionElement = $("div[data-test='item-details-description']");
    if (!descriptionElement) return null;
  
    // Get the text content of the description element
    let description = descriptionElement.textContent.trim();
  
    // Limit the description to two sentences
    const sentences = description.split(/\.|\!|\?/);
    description = sentences.slice(0, 3).join(". ") + ".";
  
    return description;
  }
  
  async function getTargetProductData() {
    try {
      const response = await axios.get(targetUrl);
      const title = getTextBetweenTags("title", response.data);
      const price = getTextAfter("current_retail", response.data);
      const description = getDescription(response.data);
      const imageUrl = getImageUrl(response.data);
  
      const cleanTitle = title ? title.replace(/: Target$/, "").trim() : null;
  
      console.log("Title:", cleanTitle);
      console.log("Price:", `$${price}`);
      console.log("Description:", description);
      console.log("Image URL:", imageUrl);
  
      // Save the result to a different collection in the same MongoDB database
      const newTargetProduct = new ProductModel({
        title: cleanTitle,
        price: `$${price}`,
        description: description,
        image: imageUrl,
      });
      await newTargetProduct.save();
  
      console.log("Data saved to Target collection in MongoDB database:", {
        title: cleanTitle,
        price: `$${price}`,
        description: description,
        image: imageUrl,
      });
    } catch (error) {
      console.error("Error fetching or saving Target product data:", error);
    } finally {
      // Close the MongoDB connection
      mongoose.connection.close();
    }
  }
  
  function getImageUrl(htmlString) {
    const regex = /<img alt=".*?" src="(.*?)"/;
    const match = regex.exec(htmlString);
    return match ? match[1] : null;
  }
  const connectToDatabase = async () => {
    try {
      await mongoose.connect("mongodb://0.0.0.0:27017/7th", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
  
      console.log("Application is successfully connected to MongoDB database (7th)");
  
      // Call the function to get Target product data and store in MongoDB
      await getTargetProductData();
    } catch (error) {
      console.error("Error connecting to MongoDB:", error.message);
    }
  };
  
  // Call the connectToDatabase function to start the process
  connectToDatabase();
  