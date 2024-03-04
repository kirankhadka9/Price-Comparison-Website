import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReadAllProduct = () => {
  let [products, setProducts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        let result = await axios({
          url: `https://fakestoreapi.com/products`,
          method: "GET",
        });
        setProducts(result.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
    <ToastContainer />
    {products.map((item, i) => (
   <div
   key={i}
   className="border border-green-500 rounded p-4 flex flex-col transition duration-300 hover:shadow-md hover:bg-green-100"
 >
   <h1 className="font-bold text-lg mb-2">Ecommerce site 1</h1>
   <div className="w-54 h-52 mb-2">
     {item && item.image && (
       <img src={item.image} alt="Product Image" className="w-full h-full" />
     )}
   </div>
   <p className="font-bold mb-2">Id: {item?.id}</p>
   <p className="font-bold mb-2">Price: ${item?.price}</p>
   <p className="mb-2">
     {/* <span className="font-bold">Description:</span> {item?.description} */}
   </p>
   <button
     className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
     onClick={() => {
       navigate(`/get-product/${item?.id}`);
     }}
   >
     View Detail
   </button>
 </div>
 
   
    ))}
  </div>
  
  );
};

export default ReadAllProduct;
