import { Schema } from "mongoose";

let productSchema2 = Schema({
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
productSchema2.index({ title: 1, price: 1 });
export default productSchema2;