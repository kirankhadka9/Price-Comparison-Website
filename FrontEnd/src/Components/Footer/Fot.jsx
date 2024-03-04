import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Fot = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="md:flex md:justify-between md:items-center sm:px-12 px-4 bg-[#ffffff19] py-0">
        <h1 className="lg:text-4xl text-3xl md:mb-0 mb-6 lg:leading-normal font-semibold md:w-2/5">
          <span className="text-teal-400">Smart</span><br/>Shopping 
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9 text-center pt-2 text-gray-400 text-sm pb-8 ">
          <div>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-2xl hover:text-teal-400 transition" />
            </a>
          </div>
          <div>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-2xl hover:text-teal-400 transition" />
            </a>
          </div>
          <div>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-2xl hover:text-teal-400 transition" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end mt-4">
          <div>
            <span>© 2020 . All rights reserved.</span>
          </div>
          <div>
            <span>Terms · Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Fot;
