import { Router } from "express";
import upload from "../middleware/upload.js";
import { handlefile } from "../controller/fileController.js";

let fileRouter = Router();

fileRouter.route("/")
.post(upload.array("document",4),handlefile);//("document",4) :file format , max no
//upload.array("document",4),handlefile: yesle document wala file public ma pathauxa + req.files generate garera handlefile lai dinxa

// .get()

// fileRouter
// .route('/:fileId')
// .get()
// .patch()
// .delete()

export default fileRouter;
