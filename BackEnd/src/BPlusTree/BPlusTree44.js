import { fetchProductsFromDatabase } from './BPlusTree33.js';
class BPlusTree4 {
    async search(key) {
        const products = await fetchProductsFromDatabase();
        const results = products.filter(product => product.key.includes(key.toLowerCase()));
        return results.length > 0 ? results : null;
    }
}
export default BPlusTree4;