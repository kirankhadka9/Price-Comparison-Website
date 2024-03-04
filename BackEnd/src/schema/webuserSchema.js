import { Schema } from "mongoose";

let webuserSchema = Schema({
  fullName: {
    type: String,
    required: [true, "fullName is required."],
  },
 
//   phoneNumber: {
//     type: Number,
//     required: [true, "number field is required"],
//     min: 1000000000,
//     max: 9999999999,
//   },

dob:{
type:Date,
required:[true,"dob is required."]
},
gender:{
  type:String,
required:[true,"gender is required."]
},
//role frontend batai send garney.
role:{
    type:String,
    required:[false,"role is required."]
},
  email: {
    type: String,
    unique:true,
    required: [true, "email is required."],
  },
  password: {
    type: String,
    required: [true, "password is required."],
  },
  
  //yo part paxi controller ma as an object pass garney
  isVerifiedEmail:{
    type:Boolean,
    required:[false,"isVerifiedEmail error."]
  },
},
{
      timestamps:true
});

export default webuserSchema;
