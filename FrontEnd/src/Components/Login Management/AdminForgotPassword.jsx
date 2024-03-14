import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  let onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      email: email,
    };

    try {
      let result = await axios({
        url: `http://localhost:8000/web-users/forgot-password`,
        method: "POST",
        data: data,
      });

      setEmail("");
      toast.success("Link has been sent to your email.");

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <ToastContainer />
      <div className="p-8 rounded shadow-md bg-gray-100">
        <h1 className="text-2xl font-semibold mb-4">Password Forgot Form</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              E-mail:
            </label>
            <input
              type="email"
              placeholder="E.g., sun123@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 mx-auto block"
          >
            Confirm
          </button>
        </form>

        <div className="text-center mt-4">
          <Link to="/login" className="underline text-blue-500 hover:text-blue-700">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
