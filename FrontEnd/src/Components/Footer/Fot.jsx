import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Fot = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-0">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-teal-400">Smart</span><br/>Shopping 
        </h1>

        <div className="flex flex-col items-center md:flex-row md:gap-9 md:justify-center text-center pt-2 text-gray-400 text-sm pb-8 mt-3">
          <div className="col-span-3">
            <Link to="/about" className="text-teal-400 hover:underline mr-2">About</Link>
            <Link to="/contact" className="text-teal-400 hover:underline ml-2 mr-2">Contact</Link>
          </div>

          <div className="mb-3">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-2xl hover:text-teal-400 transition" />
            </a>
          </div>
          <div className="mb-3">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-2xl hover:text-teal-400 transition" />
            </a>
          </div>
          <div className="mb-3">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-2xl hover:text-teal-400 transition" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center pb-6 ml-8 mt-3">
          <div className="text-gray-400 mb-4">
            <h3 className="text-sl font-semibold mb-2">Popular Categories</h3>
            <ul className="text-sm">
              <li><Link to="/category/apple" className="hover:text-teal-400">Apple</Link></li>
              <li><Link to="/category/samsung" className="hover:text-teal-400">Samsung</Link></li>
              <li><Link to="/category/dell" className="hover:text-teal-400">Dell</Link></li>
            </ul>
          </div>

          <div className="text-gray-400 mb-4">
            <h3 className="text-sl font-semibold mb-2">Helpful Links</h3>
            <ul className="text-sm">
              <li><Link to="/faq" className="hover:text-teal-400">FAQ</Link></li>
              <li><Link to="/terms" className="hover:text-teal-400">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-teal-400">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-end mt-1 text-sl">
          <div>
            <span>© 2022. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Fot;
