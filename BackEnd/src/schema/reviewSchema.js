import { Schema } from "mongoose";

let reviewSchema = Schema({
  fullName: {
    type: String,
    required: [true, "Your name is required."]
  },
  email: {
    type: String,
    required: [true, "Email is required."]
  },
  subject: {
    type: String,
    required: [true, "subject is required."]
  },
  message: {
    type: String,
    required: [true, "message is required."]
  },
  
});

export default reviewSchema;