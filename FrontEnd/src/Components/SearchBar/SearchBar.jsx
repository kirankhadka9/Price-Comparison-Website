"use client";

import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ className }) => {
  const [activeSearch, setActiveSearch] = useState(" ");

  const handleSearch = (e) => {
    setActiveSearch(e.target.value);
    console.log(activeSearch);
  };

  return (
    <form className={`mx-auto relative mt-7`}>
      <div className="relative flex items-center justify-center"> 
        <div className="bg-black-500 flex items-center rounded-full p-2 pl-10 pr-10 hover:ring-2 hover:ring-blue-500 hover:ring-opacity-50 border border-black rounded-full px-4 w-100">
          <AiOutlineSearch className="text-white-800 mr-2" />
          <input
            type="search"
            placeholder="Search.."
            className="flex-1 bg-transparent text-white-800 focus:outline-none border-none h-10"
            onChange={(e) => handleSearch(e)}
          />
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
