import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { GlobalVariableContext } from "../MyApp.jsx";
import AdminForgotPassword from "./Login Management/AdminForgotPassword.jsx";
import AdminPasswordUpdate from "./Login Management/AdminPasswordUpdate.jsx";
import AdminProfile from "./Login Management/AdminProfile.jsx";
import AdminProfileUpdate from "./Login Management/AdminProfileUpdate.jsx";
import AdminResetPassword from "./Login Management/AdminResetPassword.jsx";
import AdminVerify from "./Login Management/AdminVerify.jsx";
import ReadSpecificUser from "./Login Management/ReadSpecificUser.jsx";
import UpdateSpecificUser from "./Login Management/UpdateSpecificUser.jsx";
import ReactLink from "./ReactLink";
import CreateProducts from "./products/CreateProducts";
import ReadAllProducts from "./products/ReadAllProducts";
import ReadSpecificProduct from "./products/ReadSpecificProduct";
import UpdateProducts from "./products/UpdateProducts";
import NoProductFound from "./products/NoProductFound.jsx";
import Laptop from "./Footer/Category/Laptop.jsx";
import Mobile from "./Footer/Category/Mobile.jsx";

const ReactRouter = () => {
  // let global =useContext(GlobalVariableContext);
  // let token = global.token;

  let { token, setTOken } = useContext(GlobalVariableContext);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ReactLink></ReactLink>

              <Outlet></Outlet>
              <br />
            </div>
          }
        >
          <Route index element={<div></div>}></Route>

          <Route path="verify-email" element={<AdminVerify />}></Route>
          <Route
            path="reset-password"
            element={
              <div>
                <AdminResetPassword />
              </div>
            }
          ></Route>

          <Route
            path="admin"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route index element={<div></div>}></Route>
            {token ? (
              <>
                <Route
                  path="profile-update"
                  element={
                    <div>
                      <AdminProfileUpdate />
                    </div>
                  }
                ></Route>
                <Route
                  path="update-password"
                  element={
                    <div>
                      <AdminPasswordUpdate />
                    </div>
                  }
                ></Route>
                <Route
                  path="my-profile"
                  element={
                    <div>
                      <AdminProfile />
                    </div>
                  }
                ></Route>

                <Route
                  path=":id"
                  element={
                    <div>
                      <ReadSpecificUser />
                    </div>
                  }
                ></Route>

                <Route
                  path="update"
                  element={
                    <div>
                      <Outlet></Outlet>
                    </div>
                  }
                >
                  <Route
                    path=":id"
                    element={
                      <div>
                        <UpdateSpecificUser />
                      </div>
                    }
                  ></Route>
                </Route>
              </> //this concept is also know as private routing.
            ) : (
              <></>
            )}
            <Route
              path="products"
              element={
                <div>
                  <Outlet></Outlet>
                </div>
              }
            >
              <Route index element={<ReadAllProducts />}></Route>

              <Route path="create" element={<CreateProducts />}></Route>

              <Route path=":id" element={<ReadSpecificProduct />}></Route>

              <Route
                path="update"
                element={
                  <div>
                    <Outlet></Outlet>
                  </div>
                }
              >
                <Route path=":id" element={<UpdateProducts />}></Route>
              </Route>
            </Route>

            <Route
              path="forgot-password"
              element={
                <div>
                  <AdminForgotPassword />
                </div>
              }
            ></Route>
          </Route>
        </Route>

        <Route path="not-found" element={<NoProductFound />}></Route>
        <Route path="/category/laptop" element={<Laptop/>}></Route>
        <Route path="/category/mobile" element={<Mobile/>}></Route>

        {/* <Route path="*" element={<div>404 page not found</div>}></Route> */}

      </Routes>
    </div>
  );
};

export default ReactRouter;
