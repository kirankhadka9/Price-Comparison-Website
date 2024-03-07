import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mb-0 my-0 p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
      <h2 className="text-4xl font-semibold mb-4">Discover Smart Shopping</h2>
      <p className="text-lg mb-6">
        Welcome to a world of smart shopping! At Smart Shopping, we're on a mission to redefine your online shopping experience with cutting-edge features and a vibrant community.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-time Price Tracking</h3>
          <p className="text-gray-700">
            Our advanced algorithms ensure you always get the best deals by tracking prices in real-time across various retailers.
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">User-Friendly Interface</h3>
          <p className="text-gray-700">
            Enjoy a seamless and intuitive interface designed to simplify your product search and comparison journey.
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Community Interaction</h3>
          <p className="text-gray-700">
            Join our vibrant community, share your experiences, and discover product recommendations from fellow shoppers.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <p className="text-lg mb-4">
          Ready to experience a new era of online shopping?
        </p>
        <Link
          to="/register"
          className="bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 focus:outline-none focus:ring focus:border-pink-300"
        >
          Join Us Now
        </Link>
      </div>
    </div>
  );
};

export default About;
