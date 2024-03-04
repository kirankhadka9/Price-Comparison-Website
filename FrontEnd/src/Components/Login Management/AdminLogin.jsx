import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalVariableContext } from "../../MyApp";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let global = useContext(GlobalVariableContext);

  let navigate = useNavigate();

  let onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
      password: password,
    };
    try {
      let result = await axios({
        url: `http://localhost:8001/web-users/login`,
        method: "POST",
        data: data,
      });
      console.log(result);

      let token = result.data.data;
      localStorage.setItem("token", token);
      global.setToken(token);
       
      navigate("/");

    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <ToastContainer />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
        /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={onSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>

            <div className="container mx-auto mt-8">
              {/* Your login form here */}
              <p className="text-center text-gray-600">
                Don't have an account?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Register
                </Link>
              </p>
            </div>

            <div
              className="text-center mt-4 cursor-pointer hover:underline"
              onClick={() => {
                navigate("/admin/forgot-password");
              }}
            >
              <u>Forgot Password</u>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

//login : make form-> hit api(token)->save token to local storage->navigate (admin)
