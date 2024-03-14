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
    const Product1 = mongoose.model('Product1'); // Assuming 'Product1' is the model name
    const products = await Product1.find({});
    return products.map(product => ({
        key: (product.title || '').toLowerCase(), // Use an empty string if title is undefined
        value: product
    }));
}
class BPlusTree {
    constructor(order) {
        this.order = order;
        this.root = new Node(true);
    }
    // async search(key) {
    //     const products = await fetchProductsFromDatabase();
    //     const results = products.filter(product => product.key.toLowerCase().includes(key.toLowerCase()));
    //     return results.length > 0 ? results : null;
    // }
    async search(key) {
        const products = await fetchProductsFromDatabase();
        const results = products.filter(product => product.key.toLowerCase().includes(key.toLowerCase()));
        return results.length > 0 ? results : null;
    }
}
export { Node, BPlusTree,  fetchProductsFromDatabase };