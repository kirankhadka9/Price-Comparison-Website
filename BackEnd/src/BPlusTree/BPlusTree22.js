import { fetchProductsFromDatabase } from './BPlusTree11.js';
class BPlusTree2 {
    async search(key) {
        const products = await fetchProductsFromDatabase();
        const results = products.filter(product => product.key.includes(key.toLowerCase()));
        return results.length > 0 ? results : null;
    }
}
export default BPlusTree2;