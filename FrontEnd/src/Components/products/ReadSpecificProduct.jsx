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
    <div className="flex flex-col items-center mt-8">
      <div className="mb-2">
        <div className="w-40 h-50 relative mx-auto">
          {product.image && (
            <img
              src={product.image}
              alt="Product Image"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          )}
        </div>
        <div
          onClick={() => {
            navigate("/get-product");
          }}
          className="underline cursor-pointer hover:text-blue-500 mt-2"
        >
          Go back
        </div>
      </div>

      <div className="text-left mb-2">
        <p className="font-bold mb-2">Id: {product.id}</p>
        <p className="font-bold mb-2">Price: ${product.price}</p>
        <p className="font-bold mb-2">Rating: {product.rating?.rate}</p>
        <p className="font-bold mb-2">Product View: {product.rating?.count}</p>
        <p className="font-bold mb-2">
          Category: <span className="underline">{product.category}</span>
        </p>

        <div className="flex mb-2">
          <span className="font-bold pr-2">Description:</span>
          <div className="border border-blue-500 p-2 rounded-md bg-blue-100 max-w-xs">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadSpecificProduct;
