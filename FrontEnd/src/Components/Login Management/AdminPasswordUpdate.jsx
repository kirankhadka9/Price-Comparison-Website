import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPasswordUpdate = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  let onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    // console.log(data)

    try {
      let result = await axios({
        url: `http://localhost:8000/web-users/update-password`,
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");

      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
    <ToastContainer />
    <div className="bg-white p-8 rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Password Change Form</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Old Password */}
        <div>
          <label htmlFor="op" className="block text-sm font-medium text-gray-600">
            Old Password:
          </label>
          <input
            type="password"
            placeholder="Enter your old password."
            id="op"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
  
        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
            New Password:
          </label>
          <input
            type="password"
            placeholder="Enter new password."
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
  
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 mx-auto block"
        >
          Update
        </button>
      </form>
    </div>
  </div>
  
  );
};
export default AdminPasswordUpdate;
