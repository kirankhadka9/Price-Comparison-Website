import React, { useState, useEffect } from "react";
import "./Nav.css";
import { Link, NavLink } from "react-router-dom";
import { GlobalVariableContext } from "../../MyApp";
import SearchBar from "../SearchBar/SearchBar";

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]); // Run the effect whenever the token changes

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div >
         <nav>
      <GlobalVariableContext.Provider
        value={{ token: token, setToken: setToken }}
      >
        <Link to="/" className="title">
          Smart Shopping
        </Link>
        <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={menuOpen ? "open" : ""}>

          {/* <li>
           <SearchBar/>
          </li> */}
          
          <li>
            <NavLink to="/get-product">View Products</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
          {token ? (
            <>
            <li>
             <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/logout" onClick={handleLogout}>
                LogOut
              </NavLink>
            </li>
            </>
            
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}
        </ul>
      </GlobalVariableContext.Provider>
    </nav>

    </div>
 
  );
};
