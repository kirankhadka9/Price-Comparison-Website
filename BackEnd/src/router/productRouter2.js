import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readAllProducts,
  readProduct,
  updateProduct,
  searchByName,
} from "../controller/productController2.js";

let productRouter2 = Router();

// Route handlers
productRouter2.route("/").post(createProduct).get(readAllProducts);

productRouter2.route("/products-search/:productName").get(searchByName);

productRouter2
  .route("/:productId")
  .get(readProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRouter2;
