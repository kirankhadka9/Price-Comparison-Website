import { model } from "mongoose";

import productSchema from "./productSchema.js";
import reviewSchema from "./reviewSchema.js";
import webuserSchema from "./webuserSchema.js";
import { productSchema1 } from "./productSchema1.js";
import productSchema2 from "./productSchema2.js";


export let Webuser = model("Webuser",webuserSchema);
export let Product = model("Product",productSchema);
export let Review = model("Review",reviewSchema);
export let Product1 = model("Product1",productSchema1);
export let Product2 = model("Product2",productSchema2);

