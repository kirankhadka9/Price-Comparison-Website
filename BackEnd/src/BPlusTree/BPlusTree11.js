import mongoose from 'mongoose';

class Node {
    constructor(isLeaf = false) {
        this.isLeaf = isLeaf;
        this.keys = [];
        this.children = [];
        this.next = null;
        this.parent = null; 
    }
}

async function fetchProductsFromDatabase() {
    const Product1 = mongoose.model('Product1'); 
    const products = await Product1.find({});
    
    return products.map(product => ({
        key: (product.title || '').toLowerCase(), 
        value: product
    }));
}

class BPlusTree {
    constructor(order) {
        this.order = order;//Initializes the B+ tree with an order (number of keys per node).
        this.root = new Node(true);//Creates a root node for the tree (a leaf node).
    }      
}

export { Node, BPlusTree,  fetchProductsFromDatabase };