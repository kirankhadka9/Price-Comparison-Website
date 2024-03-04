import { Router } from "express";
import {
  createWebuser,
  deleteSpecificUser,
  forgotPassword,
  loginUser,
  myProfile,
  passwordUpdate,
  profileUpdate,
  readAllWebusers,
  readSpecificWebuser,
  resetPassword,
  updateSpecificUser,
  verifyEmail,
} from "../controller/webuserController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorized from "../middleware/authorized.js";

let webuserRouter = Router();

webuserRouter.route("/").post(createWebuser).get(isAuthenticated,authorized(["admin","superadmin"]),readAllWebusers);

webuserRouter.route("/verify-email").patch(verifyEmail);

webuserRouter.route("/login").post(loginUser);

webuserRouter.route("/my-profile").get(isAuthenticated, myProfile);
//isAuth middleware le myProfile middleware ma value pass garxa.
webuserRouter.route("/update-profile").patch(isAuthenticated, profileUpdate);

webuserRouter.route("/update-password").patch(isAuthenticated, passwordUpdate);

webuserRouter.route("/forgot-password").post(forgotPassword)
webuserRouter.route("/reset-password").patch(isAuthenticated,resetPassword)

webuserRouter
  .route("/:id")
  // .get(readSpecificWebuser)
  // .patch(updateSpecificUser)
  // .delete(deleteSpecificUser);

.get(isAuthenticated,authorized(["admin","superadmin"]),readSpecificWebuser)//admin,superadmin
.patch(isAuthenticated,authorized(["admin","superadmin"]),updateSpecificUser)//admin,superadmin
.delete(isAuthenticated,authorized(["superadmin"]),deleteSpecificUser)//superadmin

export default webuserRouter;
