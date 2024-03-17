import React, { createContext, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
// import Dropdown from './Components/Dropdown/Dropdown';
import Faq from './Components/Footer/Faqq.jsx';
import Fot from './Components/Footer/Fot.jsx';
import Policy from './Components/Footer/Policy.jsx';
import Terms from './Components/Footer/Term.jsx';
import AdminLogin from './Components/Login Management/AdminLogin.jsx';
import AdminLogout from './Components/Login Management/AdminLogout.jsx';
import AdminPasswordUpdate from './Components/Login Management/AdminPasswordUpdate.jsx';
import AdminProfile from './Components/Login Management/AdminProfile.jsx';
import AdminProfileUpdate from './Components/Login Management/AdminProfileUpdate.jsx';
import AdminRegister from './Components/Login Management/AdminRegister.jsx';
import About from './Components/Nav/InfoComponent/About';
import Contact from './Components/Nav/InfoComponent/Contact';
import Home from './Components/Nav/InfoComponent/Home';
import { Navbar } from './Components/Nav/Nav';
import ReactRouter from './Components/ReactRouter';
import SearchBar from './Components/SearchBar/SearchBar.jsx';
import ReadAllProduct from './Components/products/ReadAllProducts.jsx';
import ReadSpecificProduct from './Components/products/ReadSpecificProduct.jsx';

export let GlobalVariableContext = createContext();

const MyApp = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

 


  const handleConfirm = () => {
    // Implement your confirmation logic here
    console.log('Confirmed');
  };

  return (
    <div className="AppM min-h-screen flex flex-col">
      <GlobalVariableContext.Provider value={{ token: token, setToken: setToken }}>
        <div className="App flex-grow">
          <Navbar />
          <div className="flex justify-center items-center mt-4">
  {location.pathname === '/' && <SearchBar setFilteredProducts={setFilteredProducts} />}
</div>


          {/* <div className="flex justify-center">
            <div className="mt-3">
              {location.pathname === '/' && <Dropdown onConfirm={handleConfirm} />}
            </div>
          </div> */}

          <ReactRouter />

          <Routes>
            <Route path="/" element={<Home filteredProducts={filteredProducts} />} />
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
            <Route path="/faq" element={<Faq />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy-policy" element={<Policy />} />
            
          </Routes>
        </div>
        <div>
          <Fot />
        </div>
      </GlobalVariableContext.Provider>
    </div>
  );
};

export default MyApp;
