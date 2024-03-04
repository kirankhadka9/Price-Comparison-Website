import { Router } from "express";
import { createReview, deleteReview, readAllReviews, readReview, updateReview } from "../controller/reviewController.js";

let reviewRouter = Router();

reviewRouter.route("/")
.post(createReview)
.get(readAllReviews)

reviewRouter
.route('/:reviewId')
.get(readReview)
.patch(updateReview)
.delete(deleteReview);

export default reviewRouter;