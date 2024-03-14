import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminProfileUpdate = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  let params = useParams();
  let id = params.id;

  let genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  let onSubmit = async (e) => {
    e.preventDefault();
    let data = {
      fullName: fullName,
      dob: dob,
      gender: gender,
    };

    try {
      let result = await axios({
        url: `http://localhost:8000/web-users/update-profile`,
        method: "PATCH",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(`/profile`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  let getAdminProfile = async () => {
    try {
      let result = await axios({
        url: `http://localhost:8001/web-users/my-profile`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let data = result.data.result;
      setFullName(data.fullName);
      setDob(data.dob);
      setGender(data.gender);
    } catch (error) {}
  };

  useEffect(() => {
    getAdminProfile();
  }, []);

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded shadow-md mt-10">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Update Profile</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your full name."
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-600">
            D.O.B:
          </label>
          <input
            type="date"
            placeholder="Eg: 2002-08-21"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>

        {/* Gender */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-600">
            Select Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            {genders.map((item, i) => (
              <option key={i} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 w-full"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminProfileUpdate;
