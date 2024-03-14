import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const UpdateSpecificUser = () => {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("male");

  let navigate = useNavigate()
  let token = localStorage.getItem("token");

  let params=useParams()
  let id = params.id;

  let genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];
  
  let onSubmit = async(e) => {
    e.preventDefault();
    let data = {
      fullName : fullName ,
      dob:dob,
      gender:gender,
    }
    // console.log(data)

    try {
    let result = await axios({
      url:`http://localhost:8000/web-users/${id}`,
      method : "PATCH",
      data : data,
      headers:{
            Authorization:`Bearer ${token}`
      }
    })

    navigate(`/admin/${id}`)

  } catch (error) {
    toast.error(error.message)
  }
  };

  let getUserProfile =async()=>{

      try {

            let result = await axios({
                  url:`http://localhost:8000/web-users/${id}`,
                  method : "GET",
                  headers : {
                        Authorization : `Bearer ${token}`
                  }
            })
            // console.log(result.data.result)
            let data =result.data.result;

            setFullName(data.fullName)
            setDob(data.dob)
            setGender(data.gender)
            
      } catch (error) {
            
      }
}

useEffect(()=>{
      getUserProfile();
},[])


  return (
    <div className="flex items-center justify-center h-screen">
    <div className="p-8 bg-white rounded shadow-md">
      <ToastContainer />
      <h1 className="text-2xl font-semibold mb-4">Update Form</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Name */}
        <div className="mb-4">
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
        <div className="mb-4">
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
        <div className="mb-4">
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
  
        <div className="text-center"> {/* Centering container for the button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300 inline-block"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
  
  
    
  
  );
};
export default UpdateSpecificUser;


