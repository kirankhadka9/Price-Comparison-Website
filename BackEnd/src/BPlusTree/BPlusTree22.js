import { fetchProductsFromDatabase } from "./BPlusTree11.js";

class BPlusTree2 {
  async search(key) {
    const products = await fetchProductsFromDatabase();
    const results = products.filter((product) =>
      product.key.includes(key.toLowerCase())
    );
    //Filters  products to include only those whose keys (product titles converted to lowercase) contain the given key.
    return results.length > 0 ? results : null;
    //Returns the filtered results if any are found, otherwise returns null.
  }
}

export default BPlusTree2;
