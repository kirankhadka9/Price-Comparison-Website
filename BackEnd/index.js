// import express, { json } from "express";
// import connectToMongodb from "./src/connectToDb/connectToMongodb.js";

// import productRouter from "./src/router/productRouter.js";
// import reviewRouter from "./src/router/reviewRouter.js";
// import webuserRouter from "./src/router/webuserRouter.js";
// import cors from "cors";
// import fileRouter from "./src/router/fileRouter.js";
// import imageRouter from "./src/router/imageRouter.js";
// import { port } from "./src/constant.js";

// let expressApp = express();
// expressApp.use(json());
// expressApp.use(express.static("./public"));
// //to use cors
// //always place expressApp.use(cors()); at top because yo define gareko tala ko matra arule hit hanna pauxa.
// expressApp.use(cors());

// expressApp.listen(port,()=>{
//       console.log(`Server is running in port no:${port}`)
// });
// connectToMongodb(); // calling mdb function



// expressApp.use("/products",productRouter);
// expressApp.use("/reviews",reviewRouter);
// expressApp.use("/files", fileRouter);
// expressApp.use("/images", imageRouter);// practice to send images to public(static folder)

// expressApp.use("/web-users",webuserRouter);
// //routes define garda kabab case follow garney.

import express from 'express';
import connectToMongodb from './src/connectToDb/connectToMongodb.js';
import webuserRouter from './src/router/webuserRouter.js';
import cors from 'cors';
import { port } from './src/constant.js';
import productRouter1 from './src/router/productRouter1.js';
import productRouter2 from './src/router/productRouter2.js';
import { BPlusTree as BPlusTree1, fetchProductsFromDatabase as fetchProductsFromDatabase1 } from './src/BPlusTree/BPlusTree11.js';
import { BPlusTree as BPlusTree2, fetchProductsFromDatabase as fetchProductsFromDatabase2 } from './src/BPlusTree/BPlusTree33.js';
import mongoose from 'mongoose';
import reviewRouter from './src/router/reviewRouter.js';
const expressApp = express();
expressApp.use(express.json());
expressApp.use(express.static('./public'));
expressApp.use(cors());
const order = 5; // Set the correct order for your B+ tree
let bPlusTree = null;
async function populateBPlusTree1() {
    try {
        if (!bPlusTree) {
            await connectToMongodb();
            const productsFromDatabase = await fetchProductsFromDatabase1();
            bPlusTree = new BPlusTree1(order);
            console.log('B+ tree populated.');
        }
    } catch (error) {
        console.error('Error populating B+ tree:', error);
        // You might want to handle this error
    }
}
async function populateBPlusTree2() {
    try {
        if (!bPlusTree) {
            await connectToMongodb();
            const productsFromDatabase = await fetchProductsFromDatabase2();
            bPlusTree = new BPlusTree2(order);
            console.log('B+ tree populated.');
        }
    } catch (error) {
        console.error('Error populating B+ tree:', error);
        // You might want to handle this error
    }
}
mongoose.connect('mongodb://0.0.0.0:27017/7th')
    .then(async () => {
        console.log('Connected to MongoDB');
        // Populate the B+ tree after the connection is established
        await populateBPlusTree1();
        await populateBPlusTree2();
        // Set up your express routes and start the server here
        await startServer();
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
async function startServer() {
    expressApp.use('/products1', productRouter1);
    expressApp.use('/products2', productRouter2);
    expressApp.use('/reviews', reviewRouter);
    expressApp.use('/web-users', webuserRouter);
    expressApp.use('/products1/products-search/:productName', productRouter1);
    expressApp.use('/products2/products-search/:productName', productRouter2);
    expressApp.listen(port, () => {
        console.log(`Server is running in port number:${port}`);
    });
}
// Call populateBPlusTree() here to populate the B+ tree with products from the database
populateBPlusTree1();
populateBPlusTree2();