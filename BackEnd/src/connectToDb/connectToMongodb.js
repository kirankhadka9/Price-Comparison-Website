import mongoose from "mongoose";
// import { databaseLink } from "../constant.js";

let connectToMongodb = async ()=>{
      try{
            // await mongoose.connect(databaseLink)
            await mongoose.connect("mongodb://0.0.0.0:27017/7th")

            // await mongoose.connect(databaseLink)

            console.log("Application is successfully connected to mongodb database.")
      }
      catch(error){
            console.log(error.message);
      }
}

export default connectToMongodb;