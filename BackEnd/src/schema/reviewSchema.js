import { Schema } from "mongoose";

//pi, userid, rating, description

let reviewSchema = Schema(
      {
            productId : {type : Schema.ObjectId,
                  ref:"Product",//Product -> Mmodel ko name
                  required :[true,"productId is required"]},
            userId : {type : Schema.ObjectId,
                  ref:"User",
                  required :[true,"userId is required"]},
            rating : {type : Number,
                  required :[true,"rating is required"]},
            description :{type : String,
                  required :[true,"description is required"]}
      },
      {
            timestamps: true,
      }
)
export default reviewSchema;