const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const mongoose = require('mongoose');

// Define the schema for your Target product data
const targetProductSchema = new mongoose.Schema({
  title: String,
  price: String,
  description: String,
  category: { type: String, default: 'Laptop' },
  image: String,
  rating: { type: Number, default: 2.9 },
});

// Create a model based on the schema for Target product
const ProductModel = mongoose.model('Product2', targetProductSchema);

const targetUrl = 'https://www.target.com/p/msi-summit-e14-evo-14-0-fhd-ultra-thin-professional-laptop-intel-core-i5-1240p-iris-xe-16gb-ram-512gb-ssd-win-11-pro-a12m-026/-/A-88044112#lnk=sametab';

function getTextBetweenTags(tag, str) {
  const regex = new RegExp(`<${tag}>(.*?)<\/${tag}>`);
  const match = regex.exec(str);
  return match ? match[1].trim() : null;
}

function getTextAfter(text, str) {
  const regex = new RegExp(`${text}(.*?)(?:,|<\/.*?>)`);
  const match = regex.exec(str);
  const extractedText = match ? match[1].trim() : null;

  // Remove unwanted characters around the price
  const cleanedText = extractedText ? extractedText.replace(/[^0-9.,]+/g, '') : null;

  return cleanedText;
}

function getImageUrl(htmlString) {
  const regex = /<img alt=".+?" src="(.+?)"/;
  const match = regex.exec(htmlString);
  return match ? match[1] : null;
}

async function getTargetProductData() {
  try {
    const response = await axios.get(targetUrl);
    const title = getTextBetweenTags('title', response.data);
    const price = getTextAfter('current_retail', response.data);
    const image = getImageUrl(response.data);
    const $ = cheerio.load(response.data);
    const description = $("div[data-test='item-details-description']").text().trim();

    // Normalize description to display only two sentences
    const sentences = description.split(/[.!?]/).filter(Boolean);
    const normalizedDescription = sentences.slice(0, 2).join('.') + '.';

    // Extract only the relevant part of the title and remove ": Target"
    const cleanTitle = title ? title.replace(/[-–] Target$/i, '').replace(/: Target$/, '').trim() : null;

    console.log('Title:', cleanTitle);
    console.log('Price:', `$${price}`);
    console.log('Description:', normalizedDescription);
    console.log('Image:', image);
    console.log('Category:', 'Laptop'); // Default value for category
    console.log('Rating:', 2.9); // Default value for rating

    // Save the result to a different collection in the same MongoDB database
    const newTargetProduct = new ProductModel({
      title: cleanTitle,
      price: `$${price}`,
      description: normalizedDescription,
      image: image,
      // Use the default values provided in the schema for category and rating
    });

    await newTargetProduct.save();

    console.log('Data saved to Target collection in MongoDB database:', newTargetProduct.toObject());
  } catch (error) {
    console.error('Error fetching or saving Target product data:', error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Use the connectToDatabase function to establish a connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/7th', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Application is successfully connected to MongoDB database (7th)');

    // Call the function to get Target product data and store in MongoDB
    await getTargetProductData();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

// Call the connectToDatabase function to start the process
connectToDatabase();
