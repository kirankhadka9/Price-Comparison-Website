import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalVariableContext } from "../MyApp";

const ReactLink = () => {
  let { token, setToken } = useContext(GlobalVariableContext);

  return (
    <div>
      <div className="flex mt-4 space-x-4">
        {/* <NavLink
          to="/admin/products"
          className="text-green-500 hover:text-green-700 transition duration-300 hover:font-semibold focus:outline-none"
        >
          View Products
        </NavLink> */}
        {/* {token && (
          <>
            <NavLink
              to="/admin/products/create"
              className="text-green-500 hover:text-green-700 transition duration-300 hover:font-semibold focus:outline-none"
            >
              Create Products
            </NavLink>
           
          </>
        )} */}
      </div>
    </div>
  );
};

export default ReactLink;
