import React from 'react';

const Dropdown = ({ onSelect }) => {
  return (
    <div className="flex items-center space-x-4">
      <span>Sort by:</span>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="bg-white border border-gray-300 rounded px-3 py-1"
      >
        <option value="price">Price</option>
        <option value="rating">Rating</option>
        <option value="category">Category</option>
      </select>
    </div>
  );
};

export default Dropdown;
