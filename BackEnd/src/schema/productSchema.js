import { Schema } from "mongoose";

let productSchema = Schema({
  name: {type: String,
    required: [true, "name is required."],
  },
  price: {type: Number,
    required: [true, "price is required."],
  },
  quantity: { type: Number, 
    required: [true, "quantity is required."] },
  productId: { type: String,
     required: [false, "productId is required."] },
},{
  timestamps: true,
});

export default productSchema;