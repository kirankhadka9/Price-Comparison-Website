import { Product2 } from "../schema/model.js";
import BPlusTree2 from "../BPlusTree/BPlusTree44.js";
const order = 5;
const bPlusTree2 = new BPlusTree2(order);
//create product data
export let createProduct = async (req, res) => {
  let productData = req.body;
  try {
    let result = await Product2.create(productData);
    res.status(200).json({
      success: true,
      message: "Product data created successfully.",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
//read all data
export let readAllProducts = async (req, res) => {
  let result = await Product2.find({});
  try {
    res.status(200).json({
      success: true,
      message: "Product data read(retrieve) successfully",
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};


  export const searchByName = async (req, res) => {
    const key = req.params.productName.toLowerCase();
    const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
    const rating = req.query.rating ? parseFloat(req.query.rating) : null;
    const category = req.query.category || null;
  
    try {
      let products = await bPlusTree2.search(key);
 
      if (!products || products.length === 0) {
        return res.status(404).json({ success: false, message: 'No products found' });
      }
  
      products = products.filter(product => {
        let match = true;
        if (maxPrice) {
          switch (maxPrice) {
            case 100:
              if (product.value.price > 100) {
                match = false;
              }
              break;
            case 500:
              if (product.value.price <= 100 || product.value.price > 500) {
                match = false;
              }
              break;
            case 1000:
              if (product.value.price <= 500 || product.value.price > 1000) {
                match = false;
              }
              break;
            default:
              if (product.value.price <= 1000) {
                match = false;
              }
          }
        }
  
        if (rating && product.value.rating < rating) {
          match = false;
        }
  
        if (category && product.value.category.toLowerCase().trim() !== category.toLowerCase().trim()) {
          match = false;
        }
  
        return match;
      });
  
      if (!products || products.length === 0) {
        return res.status(404).json({ success: false, message: 'No products found matching the criteria' });
      }
  
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving products' });
    }
  };


export const rangeQuery = async (req, res) => {
const key = req.params.productName.toLowerCase();
const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice) : null;
const rating = req.query.rating ? parseFloat(req.query.rating) : null;
const category = req.query.category || null;
try {
  let products = await bPlusTree2.search(key);
  if (!products || products.length === 0) {
    return res.status(404).json({ success: false, message: 'No products found' });
  }
  products = products.filter(product => {
    let match = true;
    if (maxPrice && product.value.price > maxPrice) {
      match = false;
    }
    if (rating && product.value.rating < rating) {
      match = false;
  }
    if (category && product.value.category.toLowerCase().trim() !== category.toLowerCase().trim()) {
      match = false;
    }
    return match;
  });
  if (!products || products.length === 0) {
    return res.status(404).json({ success: false, message: 'No products found matching the criteria' });
  }
  res.status(200).json(products);
} catch (error) {
  console.error(error);
  res.status(500).json({ success: false, message: 'Error retrieving products' });
}
};
export const createIndex = async (req, res) => {
  try {
      const key = req.params.productName; // Using 'key' instead of 'userInput'
      const endKey = parseInt(req.query.maxPrice); // Using 'endKey' instead of 'maxPrice'
      if (isNaN(endKey) || endKey < 0) {
          return res.status(400).json({
              success: false,
              message: "Invalid maxPrice parameter",
          });
      }
      // Use B+ tree for indexing and range queries
      const products = bPlusTree2.rangeQuery(key, endKey); // rangeQuery(userInput, maxPrice)
      res.status(200).json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Error retrieving products' });
  }
};
//read by product id
export let readProduct = async (req, res) => {
  let productId = req.params.productId;
  try {
    let result = await Product2.findById(productId);
    res.status(200).json({
      success: true,
      message: "Product read successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//update
export let updateProduct = async (req, res) => {
  let productId = req.params.productId;
  let updateData = req.body;
  try {
    let result = await Product2.findByIdAndUpdate(productId, updateData);
    res.status(201).json({
      success: true,
      message: "Product updated successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//delete
export let deleteProduct = async (req, res) => {
  let productId = req.params.productId;
  try {
    let result = await Product2.findByIdAndDelete(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
