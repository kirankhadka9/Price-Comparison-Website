import jwt from "jsonwebtoken";
import { secretKey } from "../constant.js";

let isAuthenticated = async (req, res, next) => {
  try {
    //get token.
    let tokenString = req.headers.authorization;
    // bearer + token so remove bearer
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    //     console.log(token)

    //verify token:
    let user = await jwt.verify(token, secretKey);
    //     console.log(user)

    // get id from token
    req._id = user._id;

    //passing  req._id to next middleware.
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Token is invalid.",
    });
  }
};

export default isAuthenticated;

//isAuthentication or Authentication vaneko token valid xa ki xaina check garney process
