import React from 'react';
import Filter from './Filter';
import { useNavigate } from 'react-router-dom';

const Home = ({ filteredProducts }) => {
  let navigate = useNavigate()
  console.log(filteredProducts);

  return (
    <div className="container mx-auto mt-8">
      {/* Show Filter component only if there are no filtered products */}
      {filteredProducts.length === 0 && <Filter />}
      <div className="flex flex-wrap justify-center">
        {filteredProducts.map((product) => (
          <div
            key={product._id} 
            className="border border-green-500 rounded p-2 flex flex-col transition duration-300 hover:shadow-md hover:bg-green-100 cursor-pointer w-1/4 mb-4 mx-4"
            onClick={() => navigate(`/get-product/${product._id}`)}
          >
            <div className="w-full h-56 mb-2">
              {product.value.image && (
                <img
                  src={product.value.image}
                  alt="Product Image"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <p className="font-bold mb-2 text-sm">{product.value.title}</p>
            <p className="text-gray-600 mt-auto text-sm">Price: ${product.value.price}</p>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded mt-auto text-sm"
              onClick={() => navigate(`/get-product/${product._id}`)}
            >
              View Detail
            </button>
            <p className="text-gray-600 mt-2 text-sm">From: {product.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
