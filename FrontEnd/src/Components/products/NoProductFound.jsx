import React from 'react';
import { Link } from 'react-router-dom';

const NoProductFound = () => {
  return (
    <div className="flex flex-col items-center  h-screen">
      <p className="text-xl mb-4">No product found according to your searched query.</p>
      <p className="mb-8">Go back and try with a different search keyword.</p>
      <Link to="/" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
        Go back
      </Link>
    </div>
  );
};

export default NoProductFound;
