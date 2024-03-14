import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReadSpecificProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [productSource, setProductSource] = useState(""); // To track which product source it belongs to

  useEffect(() => {
    const getProduct = async () => {
      try {
        // Fetch product from products1
        const response1 = await axios.get(
          `http://localhost:8000/products1/${params.id}`
        );
        if (response1.data.result) {
          setProduct(response1.data.result);
          setProductSource("https://www.amazon.com/"); // Set product source as Amazon
          return;
        }

        // If product not found in products1, fetch from products2
        const response2 = await axios.get(
          `http://localhost:8000/products2/${params.id}`
        );
        if (response2.data.result) {
          setProduct(response2.data.result);
          setProductSource("https://www.target.com/"); // Set product source as Target
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    getProduct();
  }, [params.id]);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between">
        <div className="lg:mr-4 mb-4 lg:mb-0 lg:w-1/2">
          <div className="text-left mb-4">
            <h2 className="text-3xl font-bold mb-2 text-gray-800">{product.title}</h2>
            <p className="text-gray-600 mb-2">Price: <span className="font-semibold text-green-600">${product.price}</span></p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-600 mb-2">
              Category: <span className="text-blue-500">{product.category}</span>
            </p>
            <p className="text-gray-600 mb-2">Rating: {product.rating}</p>
          </div>
          <div className="flex items-center justify-center">
          <button
              onClick={() => navigate("/")}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-black focus:ring focus:border-gray-300"
            >
              Home
            </button>

            <button
              onClick={() => navigate("/get-product")}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-black focus:ring focus:border-gray-300 ml-4"
            >
              View Products
            </button>
            
          </div>
        </div>

        <div className="lg:w-1/2 lg:ml-8">
          <div className="w-full h-80 lg:h-auto overflow-hidden rounded-lg shadow-md filter drop-shadow-lg">
            {product.image && (
              <img
                src={product.image}
                alt="Product Image"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Additional product details */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Additional Details:</h3>
        <ul className="text-gray-600">
          <li><span className="font-semibold">Pinned Shipped From:</span> {product.pinnedShippedFrom}</li>
          <li>
            <span className="font-semibold">Product Source:</span> 
            <a href={productSource} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              {productSource}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ReadSpecificProduct;
