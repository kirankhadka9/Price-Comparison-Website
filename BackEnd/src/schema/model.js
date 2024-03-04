import { model } from "mongoose";

import productSchema from "./productSchema.js";
import reviewSchema from "./reviewSchema.js";
import webuserSchema from "./webuserSchema.js";


export let Webuser = model("Webuser",webuserSchema);
export let Product = model("Product",productSchema);
export let Review = model("Review",reviewSchema);



