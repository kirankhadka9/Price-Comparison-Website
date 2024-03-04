import { Router } from "express";
import { createProduct, deleteProduct, readAllProducts, readProduct, updateProduct } from "../controller/productController.js";

let productRouter =Router();

productRouter.route("/")
.post(createProduct)
.get(readAllProducts)

productRouter
.route('/:productId')
.get(readProduct)
.patch(updateProduct)
.delete(deleteProduct);

export default productRouter;