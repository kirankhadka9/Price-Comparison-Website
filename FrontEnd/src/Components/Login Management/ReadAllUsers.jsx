import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReadAllUsers = () => {
  let [users, setUser] = useState([]);

  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  let getAllUser = async (e) => {
    let result = await axios({
      url: `http://localhost:8001/web-users`,
      method: `GET`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //     console.log(result)
    //     console.log(result.data.result)
    setUser(result.data.result);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div>
    {users.map((item, i) => (
      <div key={i} className="border-2 border-black mt-3 p-4">
        <p>
          User Full Name: {item.fullName}
          <br />
          User Gender: {item.gender}
          <br />
          User Email: {item.email}
          <br />
          <button
            className="mr-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => {
              navigate(`/admin/${item._id}`);
            }}
          >
            View
          </button>
          <button
            className="mr-4 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition duration-300"
            onClick={() => {
              navigate(`/admin/update/${item._id}`);
            }}
          >
            Edit
          </button>
          <button
            className="mr-4 bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-300"
            onClick={async () => {
              try {
                const result = await axios({
                  url: `http://localhost:8001/web-users/${item._id}`,
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
                getAllUser();
              } catch (error) {
                console.log("error");
              }
            }}
          >
            Delete
          </button>
        </p>
      </div>
    ))}
  </div>
  
  );
};

export default ReadAllUsers;
