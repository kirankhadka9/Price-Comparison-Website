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

      let token = result.data.data;
      localStorage.setItem("token", token);
      global.setToken(token);

      navigate("/");

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-green-500">
      <ToastContainer />
      <div className="flex flex-col justify-center items-center p-8 rounded-md bg-white bg-opacity-80 shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Sign in to your account</h2>
        <form className="space-y-4 w-full" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="text-sm text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full rounded-md border-0 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="mt-1 p-2 w-full rounded-md border-0 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Login
            </button>
          </div>

          <div className="text-center text-gray-800">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>

          <div
            className="text-center mt-4 cursor-pointer text-blue-500 hover:underline"
            onClick={() => {
              navigate("/admin/forgot-password");
            }}
          >
            <u>Forgot Password</u>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
