import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  readAllProducts,
  readProduct,
  updateProduct,
  searchByName,
} from "../controller/productController1.js";
let productRouter1 = Router();
// Route handlers
productRouter1.route("/").post(createProduct).get(readAllProducts);

productRouter1.route("/products-search/:productName").get(searchByName);

productRouter1
  .route("/:productId")
  .get(readProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productRouter1;
