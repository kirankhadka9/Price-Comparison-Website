import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GlobalVariableContext } from "../../MyApp";

const AdminLogout = () => {
  let global = useContext(GlobalVariableContext);

  let navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    global.setToken("");
    navigate("/");
  }, []);
  return <div>l-out</div>;
};

export default AdminLogout;

