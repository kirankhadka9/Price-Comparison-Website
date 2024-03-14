import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AdminProfile = () => {

      let [profile, setProfile]=useState({});
      let token = localStorage.getItem("token")

      let navigate = useNavigate();
      let getAdminProfile =async()=>{

            try {

                  let result = await axios({
                        url:`http://localhost:8000/web-users/my-profile`,
                        method : "GET",
                        headers : {
                              Authorization : `Bearer ${token}`
                        }
                  })
                  console.log(result.data.result)
                  setProfile(result.data.result)
            } catch (error) {
            }
      }

      useEffect(()=>{
            getAdminProfile();
      },[])
  return (
      <div className="p-8 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <p className="mb-2">Full name: {profile.fullName}</p>
      <p className="mb-2">Gender: {profile.gender}</p>
      <p className="mb-2">Date of Birth: {new Date(profile.dob).toLocaleDateString()}</p>
      <p className="mb-2">Role: {profile.role}</p>
    
      {/* Uncomment button when needed */}
      <button
  onClick={() => {
    navigate("/update/:id");
  }}
  className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-300 mb-4"
>
  Update Profile
</button>
<button
  onClick={() => {
    navigate("/update/password");
  }}
  className="bg-lime-500 text-white p-2 rounded border-2 border-lime-500 hover:bg-lime-600 transition duration-300 ml-4"
>
  Update Password
</button>


     
    </div>
    
  )
}

export default AdminProfile