import React, { createContext, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Fot from "./Components/Footer/Fot.jsx";
import AdminLogin from "./Components/Login Management/AdminLogin.jsx";
import AdminLogout from "./Components/Login Management/AdminLogout.jsx";
import AdminPasswordUpdate from "./Components/Login Management/AdminPasswordUpdate.jsx";
import AdminProfile from "./Components/Login Management/AdminProfile.jsx";
import AdminProfileUpdate from "./Components/Login Management/AdminProfileUpdate.jsx";
import AdminRegister from "./Components/Login Management/AdminRegister.jsx";
import About from "./Components/Nav/InfoComponent/About";
import Contact from "./Components/Nav/InfoComponent/Contact";
import Home from "./Components/Nav/InfoComponent/Home";
import { Navbar } from "./Components/Nav/Nav";
import ReactRouter from "./Components/ReactRouter";
import SearchBar from "./Components/SearchBar/SearchBar.jsx";
import ReadAllProduct from "./Components/products/ReadAllProducts.jsx";
import ReadSpecificProduct from "./Components/products/ReadSpecificProduct.jsx";

export let GlobalVariableContext = createContext();

const MyApp = () => {
  //let token = localStorage.getItem("token")
  let [token, setToken] = useState(localStorage.getItem("token"));
  const [results, setResults] = useState([]);

  return (
    <div className="AppM min-h-screen flex flex-col">
    <GlobalVariableContext.Provider
      value={{ token: token, setToken: setToken }}
    >
      <div className="App flex-grow">
          <Navbar />
          
          <SearchBar />

          <ReactRouter />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/get-product" element={<ReadAllProduct />} />
            <Route path="/get-product/:id" element={<ReadSpecificProduct />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/profile" element={<AdminProfile />} />
            <Route path="/update/:id" element={<AdminProfileUpdate />} />
            <Route path="/update/password" element={<AdminPasswordUpdate />} />

            <Route path="/login" element={<AdminLogin />} />
            <Route path="/register" element={<AdminRegister />} />
            <Route path="/logout" element={<AdminLogout />} />
          </Routes>
        </div>

       <div >
       <Fot />
       </div>

      </GlobalVariableContext.Provider>
    </div>
  );
};

export default MyApp;
