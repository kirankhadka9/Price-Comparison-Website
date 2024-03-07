import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRegister = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");
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
      email: email,
      password: password,
    };

    // Adding role
    data = {
      ...data,
      role: "admin",
    };

    try {
      let result = await axios({
        url: `http://localhost:8001/web-users`,
        method: "POST",
        data: data,
      });

      setFullName("");
      setEmail("");
      setPassword("");
      setDob("");
      setGender("male");

      toast.success(
        "A link has been sent to your email. Please click the given link to verify your email."
      );
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-lavender-500 bg-opacity-80">
    <ToastContainer />
      <ToastContainer />
      <div className="bg-white p-8 rounded-md bg-opacity-80 shadow-md">
        <h1 className="text-3xl font-semibold mb-4">Registration Form</h1>
        <form onSubmit={onSubmit} className="space-y-4 w-full">
          <div>
            <label htmlFor="name" className="text-sm text-gray-600">
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

          <div>
            <label htmlFor="dob" className="text-sm text-gray-600">
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

          <div>
            <label htmlFor="gender" className="text-sm text-gray-600">
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

          <div>
            <label htmlFor="email" className="text-sm text-gray-600">
              E-mail:
            </label>
            <input
              type="email"
              placeholder="Eg: sun03@gmail.com"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <div>
            <label htmlFor="pw" className="text-sm text-gray-600">
              Password:
            </label>
            <input
              type="password"
              placeholder="Eg: $un123@#"
              id="pw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 mx-auto block"
          >
            Proceed
          </button>
          <Link
            to="/login"
            className="block text-center underline text-blue-500 hover:text-blue-700"
          >
            Back to login
          </Link>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister;
