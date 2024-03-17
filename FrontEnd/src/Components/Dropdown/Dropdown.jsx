import React, { useState } from 'react';

const Dropdown = ({ products, setFilteredProducts }) => {
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');

  const handleConfirm = () => {
    // Filter products based on selected criteria
    const filteredProducts = products.filter(product => {
      let priceCondition = true;
      let categoryCondition = true;
      let ratingCondition = true;

      if (priceRange) {
        const [minPrice, maxPrice] = priceRange.split('-');
        priceCondition = product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice);
      }

      if (category) {
        categoryCondition = product.category.toLowerCase() === category.toLowerCase();
      }

      if (rating) {
        ratingCondition = product.rating === parseInt(rating);
      }

      return priceCondition && categoryCondition && ratingCondition;
    });

    // Update the filtered products state using the prop function
    setFilteredProducts(filteredProducts);
  };

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start space-y-4 md:space-x-4 md:space-y-0 mt-4 md:mt-0 bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Price:</span>
        <select
          onChange={(e) => setPriceRange(e.target.value)}
          className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="0-100">$0 - $100</option>
          <option value="100-500">$100 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000">$1000+</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Category:</span>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="mobile">Mobile</option>
          <option value="laptop">Laptop</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Rating:</span>
        <select
          onChange={(e) => setRating(e.target.value)}
          className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
      </div>
      <button onClick={handleConfirm} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Confirm
      </button>
    </div>
  );
};

export default Dropdown;
