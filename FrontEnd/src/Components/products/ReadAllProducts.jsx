import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../SearchBar/SearchBar";

const ReadAllProduct = () => {
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products1");
        setProducts(response.data.result);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    const getAllProducts1 = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products2");
        setProducts1(response.data.result);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    getAllProducts();
    getAllProducts1();
  }, []);

  return (
    <div>
      {/* <SearchBar /> */}
      <ToastContainer />
      <div className="flex justify-between mt-9">
        <div className="overflow-y-auto max-h-screen w-1/2 p-4 border rounded-lg shadow-md bg-gray-100 ml-3 mr-2">
          <p className="text-center text-xl font-semibold mb-4">Amazon Products</p>
          <div className="flex flex-wrap justify-center">
            {Array.isArray(products) &&
              products.map((item) => (
                <div
                  key={item._id}
                  className="border border-green-500 rounded p-4 flex flex-col transition duration-300 hover:shadow-md hover:bg-green-100 cursor-pointer w-1/2 mb-4"
                  onClick={() => navigate(`/get-product/${item._id}`)}
                >
                  <div className="w-full h-52 mb-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <p className="font-bold mb-2">{item.title}</p>
                  <p className="font-bold mb-2">Price: ${item.price}</p>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => navigate(`/get-product/${item._id}`)}
                  >
                    View Detail
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="overflow-y-auto max-h-screen w-1/2 p-4 border rounded-lg shadow-md bg-gray-100 mr-3 ml-2">
          <p className="text-center text-xl font-semibold mb-4">Target Products</p>
          <div className="flex flex-wrap justify-center">
            {Array.isArray(products1) &&
              products1.map((item) => (
                <div
                  key={item._id}
                  className="border border-blue-500 rounded p-4 flex flex-col transition duration-300 hover:shadow-md hover:bg-blue-100 cursor-pointer w-1/2 mb-4"
                  onClick={() => navigate(`/get-product/${item._id}`)}
                >
                  <div className="w-full h-52 mb-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt="Product Image"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <p className="font-bold mb-2">{item.title}</p>
                  <p className="font-bold mb-2">Price: ${item.price}</p>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => navigate(`/get-product/${item._id}`)}
                  >
                    View Detail
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadAllProduct;
