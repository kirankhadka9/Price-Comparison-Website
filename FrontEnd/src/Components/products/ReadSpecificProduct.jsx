import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReadSpecificProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${params.id}`
        );
        setProduct(response.data);
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
            <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-600 mb-2">
              Category: <span className="text-blue-500">{product.category}</span>
            </p>
            <p className="text-gray-600 mb-2">Rating: {product.rating?.rate}</p>
          </div>
          <div className="flex items-center justify-center mt-4">
        <button
          onClick={() => navigate("/get-product")}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Go back
        </button>
      </div>
        </div>

        <div className="lg:w-1/2 lg:ml-8">
          <div className="w-full h-30 lg:h-auto overflow-hidden rounded-lg shadow-md">
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

     
    </div>
  );
};

export default ReadSpecificProduct;
