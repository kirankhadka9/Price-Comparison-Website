import { serverLink } from "../constant.js";

export let handlefile=(req,res)=>{
      let links = req.files.map((value,i)=>{
            return `${serverLink}/${value.filename}`;
            //return `http://localhost:8001/${value.filename}`
            //serverLink = http://localhost:8001
      })
      res.json({
            success:true,
            message:"file uploaded successfully.",
            result:links
      })
}

