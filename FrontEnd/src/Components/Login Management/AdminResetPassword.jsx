import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminResetPassword = () => {
    let [newPassword, setNewPassword] = useState("");
    let navigate = useNavigate();
    let [query] = useSearchParams();
    let token = query.get("token");

    let onSubmit = async(e) => {
        e.preventDefault();
        let data = {
            password: newPassword
        }
        try {
            let result = await axios({
                url: `http://localhost:8000/web-users/reset-password`,
                method: `PATCH`,
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(result);
            // displaySuccess(result.data.message);
            navigate("/admin/login");
        } catch (error) {
            console.log(error.response.data.message);
            // displayError(error.response.data.message);
        }
    }
  return (
    <>
    <ToastContainer />
  
    <form onSubmit={onSubmit} className="p-8 bg-white rounded shadow-md">
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
          New Password:
        </label>
        <input
          id="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded w-full"
        />
      </div>
  
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Reset
      </button>
    </form>
  </>
  
    )
}

export default AdminResetPassword