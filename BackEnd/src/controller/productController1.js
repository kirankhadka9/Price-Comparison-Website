import cron from "node-cron";
import BPlusTree2 from "../BPlusTree/BPlusTree22.js";
import { Product1 } from "../schema/model.js";
const order = 5;
const bPlusTree2 = new BPlusTree2(order);
export let createProduct = async (req, res) => {
  let productData = req.body;
  try {
    let result = await Product1.create(productData);
    res.status(200).json({
      success: true,
      message: "Product data created successfully.",
      result: result
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
    let result = await Product1.find({});
    console.log(result);
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
//  export const readAllProducts = async (req, res, next)=>{
//     try{
//         let search_term = req.query.search_term || ""
//         // let job_level = req.query.job_level || ""
//         // let page = parseInt(req.query.page) || 1
//         // let per_page = parseInt(req.query.per_page) || 5
//         // let total = await Job.aggregate(
//         //     [
//         //         // {
//         //         //     $match: {
//         //         //         $or: [
//         //         //             { name: RegExp(search_term, "i") },
//         //         //             { categories: RegExp(search_term, "i") }
//         //         //         ]
//         //         //     }
//         //         // },
//         //         {
//         //             $match: {
//         //                 $and: [
//         //                     { $or: [{ name: RegExp(search_term, "i") }, { categories: RegExp(search_term, "i") }] },
//         //                     { job_level: RegExp(job_level, "i") }
//         //                 ]
//         //             }
//         //         },
            
//         //         {
//         //             $lookup: {
//         //                 from: "users",
//         //                 localField: "created_by",
//         //                 foreignField: "_id",
//         //                 as: "created_by"
//         //             }
//         //         },
//         //         {
//         //             $unwind: "$created_by"
//         //         },
//         //         {
//         //             $project: {
//         //                 "created_by.password": 0,
//         //                 "created_by.updatedAt": 0,
//         //                 "created_by.role": 0,
//         //             }
//         //         },
//         //         {
//         //             $count: "total"
//         //         }



//         //     ]
//         // )
//         let result = await Product1.aggregate(
//             [
//                 {
//               $match: {
//                         $or: [
//                             { title: RegExp(search_term, "i") },
//                             { category: RegExp(search_term, "i") }
//                         ]
//                     }
//                 },
//             ]
//         )
//         // const totalJobs = total?.[0]?.total || 0;
//         res.send({
//             // meta_data: {
//             //     // total: total[0].total,
//             //     total: totalJobs,
//             //     page,
//             //     per_page
//             // },
//             result: result,
//         })
//     }
//     catch(err){
//         next(err);
//     }
// } 



  //-------------------USING B+ TREE SEARCHING

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
// export const createIndex = async (req, res) => {
//   try {
//       const key = req.params.productName;
//       const maxPrice = parseInt(req.query.maxPrice);
//       if (isNaN(maxPrice) || maxPrice < 0) {
//           return res.status(400).json({
//               success: false,
//               message: "Invalid maxPrice parameter",
//           });
//       }
//       // Use B+ tree for indexing and range queries
//       const products = bPlusTree2.rangeQuery(key, maxPrice);
//       res.status(200).json(products);
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ success: false, message: 'Error retrieving products' });
//   }
// };
  //read by product id
  
  export let readProduct = async (req, res) => {
    let productId = req.params.productId;
    try {
      let result = await Product1.findById(productId);
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
  export let updateProduct = async (req, res) => {
    let productId = req.params.productId;
    let updateData = req.body;
    try {
        // Retrieve previous product data
        let previousProductData = await Product1.findById(productId);
        // Update product
        await Product1.findByIdAndUpdate(productId, updateData);
        // Check if price decreased
        if (updateData.price < previousProductData.price) {
            // Send email notification
            await sendEmailNotification(previousProductData.title, previousProductData.price, updateData.price);
        }
        // Send response
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

// cron.schedule('0 0 * * *', async () => {
//   try {
//       // Retrieve all products
//       const products = await Product1.find({});
//       // Check for price changes
//       for (const product of products) {
//           // Retrieve previous price from the database
//           const previousProductData = await Product1.findById(product._id);
//           // If price changed, send email notification
//           if (previousProductData.price !== product.price) {
//               await sendPriceChangeNotification(product);
//           }
//       }
//   } catch (error) {
//       console.error("Error checking for price changes:", error.message);
//   }
// }, {
//   scheduled: true,
//   timezone: "Asia/Kathmandu"
// });
// // Function to send email notification for price change
// // Function to send email notification for price change to all users
// const sendPriceChangeNotification = async (previousProductData, newPrice) => {
//   try {
//       // Fetch all user emails from the database
//       const users = await WebUser.find({}, { email: 1 });
//       // Iterate over each user and send the email notification
//       for (const user of users) {
//           const mailInfo = {
//               from: '"Smart shopping-The price comparison website" <kirankhadkamrkk@gmail.com>',
//               to: user.email,
//               subject: `Price Change Notification: ${previousProductData.title}`,
//               html: `
//                   <h3>Price Change Notification</h3>
//                   <p>The price of ${previousProductData.title} has changed from $${previousProductData.price} to $${newPrice}.</p>
//               `
//           };
//           // Send email notification
//           await sendEmail(mailInfo);
//       }
//       // Update previous price in the database
//       await Product1.findByIdAndUpdate(previousProductData._id, { price: newPrice });
//   } catch (error) {
//       console.error("Error sending price change notification:", error.message);
//   }
// };
  //delete
 
  export let deleteProduct = async (req, res) => {
    let productId = req.params.productId;
    try {
      let result = await Product1.findByIdAndDelete(productId);
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
//---------------USING MONGODB QUERY
  // export const searchByName = async (req, res) => {
  //   try {
  //     const userInput = req.params.productName;
  //     const products = await Product1.find({ title: { $regex: userInput, $options: 'i' } });
  //     res.status(200).json(products);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ success: false, message: 'Error retrieving products' });
  //   }
  // };
  // export const createIndex= async (req, res) => {
  //   try {
  //     const userInput = req.params.productName;
  //     const maxPrice = parseInt(req.query.maxPrice);
  //     if (isNaN(maxPrice) || maxPrice < 0) {
  //       return res.status(400).json({
  //         success: false,
  //         message: "Invalid maxPrice parameter",
  //       });
  //     }
  //     const products = await Product1.find({
  //       title: { $regex: userInput, $options: 'i' },
  //       price: { $lte: maxPrice }
  //     });
  //     res.status(200).json(products);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ success: false, message: 'Error retrieving products' });
  //   }
  // };