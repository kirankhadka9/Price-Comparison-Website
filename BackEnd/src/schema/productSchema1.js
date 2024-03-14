import { Schema } from "mongoose";
import { Product1 } from "./model.js";

let productSchema1 = Schema({
  productId: {
    type: String,
    required: [true, "productId is required."]
  },
  title: {
    type: String,
    required: [true, "title is required."]
  },
  description: {
    type: String,
    required: [true, "description is required."]
  },
  price: {
    type: Number,
    required: [true, "price is required."]
  },
  category: {
    type: String, 
    required: [true, "category is required."]
  },
  image: {
    type: String, 
    required: [true, "image is required."]
  },
  rating: {
    type: Number,
    required: [true, "rating is required."]
  },
});

// Indexing title for faster search
productSchema1.index({ title: 1 });

async function fetchProductsFromDatabase() {
  const products = await Product1.find({});
  return products.map(product => ({ key: product.title.toLowerCase(), value: product }));
}
export { productSchema1, fetchProductsFromDatabase };
