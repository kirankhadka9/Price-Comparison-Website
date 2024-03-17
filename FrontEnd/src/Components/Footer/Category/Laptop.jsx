import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Laptop = () => {
  const [laptopProducts, setLaptopProducts] = useState([]);

  useEffect(() => {
    const fetchLaptopProducts = async () => {
      try {
        const response1 = await axios.get('http://localhost:8000/products1');
        const response2 = await axios.get('http://localhost:8000/products2');

        const products1 = response1.data.filter(product => product.category.toLowerCase() === 'laptop').map(product => ({
          ...product,
          source: 'Amazon'
        }));

        const products2 = response2.data.filter(product => product.category.toLowerCase() === 'laptop').map(product => ({
          ...product,
          source: 'Target'
        }));

        const mergedProducts = [...products1, ...products2];
        setLaptopProducts(mergedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchLaptopProducts();
  }, []);

  return (
    <div>
      {laptopProducts.map(product => (
        <div key={product._id}>
          <p>Title: {product.title}</p>
          <p>Price: ${product.price}</p>
          <p>Source: {product.source}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Laptop;
