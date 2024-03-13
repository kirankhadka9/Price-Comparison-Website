import React from 'react';

const Faqq = () => {
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4 text-gray-800">Frequently Asked Questions</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">1. How to compare prices?</h2>
        <p className="text-lg text-gray-600">You can compare prices by ........</p>
        <h2 className="text-xl font-semibold mb-2 mt-4">2. How can I choose the best product?</h2>
        <p className="text-lg text-gray-600">You can select product based on its ratings, review, price and so on.</p>
        <h2 className="text-xl font-semibold mb-2 mt-4">3. What QUESTION ?</h2>
        <p className="text-lg text-gray-600">ans:xyz <a href="/terms" className="text-blue-500">Terms of Service</a> for more details.</p>
      </div>
    </div>
  );
};

export default Faqq;
