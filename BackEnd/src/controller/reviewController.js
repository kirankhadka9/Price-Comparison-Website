import { Review } from "../schema/model.js";

//create review data
export let createReview = async (req, res) => {
  let reviewData = req.body;
  try {
    let result = await Review.create(reviewData);
    res.json({
      success: true,
      message: "Review data created successfully.",
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};

//read all data
export let readAllReviews = async (req, res) => {

  let result = await Review.find({}).populate("productId","name  -_id").populate("userId","name email -_id");

  try {
    res.json({
      success: true,
      message: "Review data read(retrieve) successfully", 
      result: result,
    });
  } catch (e) {
    res.json({
      success: false,
      message: e.message,
    });
  }
};

//read by review id
export let readReview = async (req, res) => {
  let reviewId = req.params.reviewId;

  try {
    let result = await Review.findById(reviewId);
    res.json({
      success: true,
      message: "Review read successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//update
export let updateReview = async (req, res) => {
  let reviewId = req.params.reviewId;
  let updateData = req.body;
  try {
    let result = await Review.findByIdAndUpdate(reviewId, updateData);
    res.json({
      success: true,
      message: "Review updated successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//delete
export let deleteReview = async (req, res) => {
  let reviewId = req.params.reviewId;
  try {
    let result = await Review.findByIdAndDelete(reviewId);
    res.json({
      success: true,
      message: "Review deleted successfully",
      result: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
