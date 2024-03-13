import React from 'react';

const Dropdown = ({ onSelect }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-600">Sort by:</span>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="price" className="text-gray-800">Price</option>
        <option value="rating" className="text-gray-800">Rating</option>
        <option value="category" className="text-gray-800">Category</option>
      </select>
    </div>
  );
};

export default Dropdown;
