import { Router } from "express";
import { createReview } from "../controller/reviewController.js";

let reviewRouter = Router();

reviewRouter.route("/")
.post(createReview)


export default reviewRouter;