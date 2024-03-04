import express, { json } from "express";
import connectToMongodb from "./src/connectToDb/connectToMongodb.js";

import productRouter from "./src/router/productRouter.js";
import reviewRouter from "./src/router/reviewRouter.js";
import webuserRouter from "./src/router/webuserRouter.js";
import cors from "cors";
import fileRouter from "./src/router/fileRouter.js";
import imageRouter from "./src/router/imageRouter.js";
import { port } from "./src/constant.js";

let expressApp = express();
expressApp.use(json());
expressApp.use(express.static("./public"));
//to use cors
//always place expressApp.use(cors()); at top because yo define gareko tala ko matra arule hit hanna pauxa.
expressApp.use(cors());

expressApp.listen(port,()=>{
      console.log(`Server is running in port no:${port}`)
});
connectToMongodb(); // calling mdb function



expressApp.use("/products",productRouter);
expressApp.use("/reviews",reviewRouter);
expressApp.use("/files", fileRouter);
expressApp.use("/images", imageRouter);// practice to send images to public(static folder)

expressApp.use("/web-users",webuserRouter);
//routes define garda kabab case follow garney.