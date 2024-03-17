// SearchBar.jsx
import React, { useState } from "react";
import axios from "axios";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

const SearchBar = ({ className, setFilteredProducts }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [productNotFound, setProductNotFound] = useState(false);

  const getPriceRangeMaxPrice = (priceRange) => {
    switch (priceRange) {
      case "0-100":
        return 100;
      case "100-500":
        return 500;
      case "500-1000":
        return 1000;
      case "1000":
        return 10000; // Assuming this should cover prices greater than 1000
      default:
        return null;
    }
  };

  const getRatingValue = (rating) => {
    switch (rating) {
      case "1":
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      case "4":
        return 4;
      case "5":
        return 5;
      default:
        return null;
    }
  };

  const getCategoryValue = (category) => {
    switch (category) {
      case "mobile":
        return "Mobile";
      case "laptop":
        return "Laptop";
      default:
        return null;
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      let url1 = `http://localhost:8000/products1/products-search/${searchTerm}?`;
      let url2 = `http://localhost:8000/products2/products-search/${searchTerm}?`;

      const params = new URLSearchParams();

      if (priceRange) {
        params.append("maxPrice", getPriceRangeMaxPrice(priceRange));
      }

      if (rating) {
        params.append("rating", getRatingValue(rating));
      }

      if (category) {
        params.append("category", getCategoryValue(category));
      }

      // Append params to URLs
      const paramsString = params.toString();
      if (paramsString !== "") {
        url1 += paramsString;
        url2 += paramsString;
      }

      const response1 = await axios.get(url1);
      const response2 = await axios.get(url2);

      if (response1.status === 404 && response2.status === 404) {
        // Handle case when no products are found
        console.log("No products found matching the criteria");
        setFilteredProducts([]);
        navigate("/not-found"); // Redirect to not found page
        return;
      }

      const products1 = response1.data.map((product) => ({
        ...product,
        source: "Amazon",
      }));

      const products2 = response2.data.map((product) => ({
        ...product,
        source: "Target",
      }));

      const mergedProducts = [...products1, ...products2];
      setFilteredProducts(mergedProducts);
    } catch (error) {
      console.error("Error searching products:", error);
      if (error.response.status === 404 || error.response.status === 400) {
        navigate("/not-found"); // Redirect to not found page
      }
    }
  };

  return (
    <form onSubmit={handleSearch} className={`mx-auto relative mt-7`}>
      <div className="relative flex items-center justify-center">
        <div className="bg-black-500 flex items-center rounded-full p-2 pl-10 pr-10 hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 border border-black rounded-full px-4 w-100">
          <AiOutlineSearch className="text-white-800 mr-2" />
          <input
            type="search"
            placeholder="Search.."
            className="flex-1 bg-transparent text-white-800 focus:outline-none border-none h-10"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-green-800 text-white px-4 py-2 rounded-lg ml-2"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-center md:justify-start space-y-4 md:space-x-4 md:space-y-0 mt-4 md:mt-0 bg-white rounded-lg p-4 shadow-md">
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Price:</span>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="0-100">$0 - $100</option>
            <option value="100-500">$100 - $500</option>
            <option value="500-1000">$500 - $1000</option>
            <option value="1000">$1000+</option>
          </select>
          <span>Selected Price Range: {priceRange || "All"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Category:</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="mobile">Mobile</option>
            <option value="laptop">Laptop</option>
          </select>
          <span>Selected Category: {getCategoryValue(category) || "All"}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Rating:</span>
          <select
            value={rating}
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
          <span>Selected Rating: {getRatingValue(rating) || "All"}</span>
        </div>
      </div>
      {productNotFound && <div>No products found matching the criteria.</div>}
    </form>
  );
};

export default SearchBar;
