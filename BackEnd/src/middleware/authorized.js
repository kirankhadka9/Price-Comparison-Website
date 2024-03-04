import { Webuser } from "../schema/model.js"

let authorized=(roles)=>{
    // roles=["Admin","super-admin"]
     return async (req,res,next)=>{
   try {
     let id=req._id
     let result= await Webuser.findById(id)
     console.log(result)
     let tokenRole=result.role
     if(roles.includes (tokenRole)){
     next()
     }
     else{
   res.status(403).json({
     success:false,
     message: "not authorized"
   })
     }
   } catch (error) {
     res.json({
       success:false,
       message:"user isn't authenticated"
     })
   }
     }
   }
   export default authorized