import { Review } from "../schema/model.js";


export let createReview = async (req, res) => {
    let formData = req.body;
    try {
      let result = await Review.create(formData);
      res.status(200).json({
        success: true,
        message: "Form submitted successfully.",
        result: result
      });
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e.message,
      });
    }
  };