import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ReadSpecificUser = () => {

      let [user, setUser]=useState({});
      let token = localStorage.getItem("token")

      let navigate = useNavigate();
      let params=useParams()
      let id = params.id;


      let getAdminUser =async()=>{

            try {

                  let result = await axios({
                        url:`http://localhost:8000/web-users/${id}`,
                        method : "GET",
                        headers : {
                              Authorization : `Bearer ${token}`
                        }
                  })
                  console.log(result.data.result)
                  setUser(result.data.result)
                  
            } catch (error) {
                  
            }

      }


      useEffect(()=>{
            getAdminUser();
      },[])
  return (
      <div className="p-8 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Specific User Dashboard</h1>
      <p className="mb-2">Full name: {user.fullName}</p>
      <p className="mb-2">Gender: {user.gender}</p>
      <p className="mb-2">Date of Birth: {new Date(user.dob).toLocaleDateString()}</p>
      <p className="mb-2">Role: {user.role}</p>
    
      <button
        onClick={() => {
          navigate(`/admin/update/${user._id}`);
        }}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        Update
      </button>
    </div>
    
  )
}

export default ReadSpecificUser