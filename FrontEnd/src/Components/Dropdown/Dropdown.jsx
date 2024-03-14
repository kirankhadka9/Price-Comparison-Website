import React, { useState } from 'react';

const Dropdown = ({ onSelect, onConfirm }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    price: '',
    category: '',
    rating: '',
    sortBy: ''
  });

  const handleSelect = (filterType, value) => {
    setSelectedFilters(prevState => ({
      ...prevState,
      [filterType]: value
    }));
  };

  const handleConfirm = () => {
    onConfirm(selectedFilters);
  };

  return (
    <div className="flex flex-wrap items-center justify-center md:justify-start space-y-4 md:space-x-4 md:space-y-0 mt-4 md:mt-0">
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Price:</span>
        <select
          onChange={(e) => handleSelect('price', e.target.value)}
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
          onChange={(e) => handleSelect('category', e.target.value)}
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
          onChange={(e) => handleSelect('rating', e.target.value)}
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
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">Sort by:</span>
        <select
          onChange={(e) => handleSelect('sortBy', e.target.value)}
          className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">None</option>
          <option value="lowprice">Low Price</option>
          <option value="highprice">High Price</option>
        </select>
      </div>
      <button
        onClick={handleConfirm}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Confirm
      </button>
    </div>
  );
};

export default Dropdown;
