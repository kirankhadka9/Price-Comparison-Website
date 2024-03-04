import { Router } from "express";
import upload from "../middleware/upload.js";
let imageRouter = Router();
let handleImages =(req,res)=>{
      let imageLink = req.files.map((value,i)=>{
            return `http://localhost:8001/${value.filename}`;
      })
      res.json({
            success : true,
            message : `Images uploaded successfully.`,
            result : imageLink
      })
}
imageRouter.route("/").post(upload.array("images",5),handleImages);
export default imageRouter;