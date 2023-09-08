import listProducts from "../service/product/list.service";

const filterProduct = async (prod) => {
  try {
    const allProducts = await listProducts();
    const product = allProducts.products.find((p) => prod.code === p.code);
    if (!product) {
      return null;
    }
    return product;
  } catch (e) {
    console.error("Error when finding products:", e);
    throw e;
  }
} 

const checkRules = async (product) => {
  try {
    const filteredProduct = await filterProduct(product);

    if (!filteredProduct || !filteredProduct.code || !filteredProduct.salesprice) {
      return { error: '"code" or "salesprice" fields are not valid !' };
    } else {
      const diferencePrice = Math.abs(product.salesprice - filteredProduct.salesprice);
      const maxAdjustmentPercentage = product.salesprice * 0.1;

      if (diferencePrice > maxAdjustmentPercentage) {
        return { error: 'Adjustment above 10% !' };
      } else if (product.costprice > filteredProduct.salesprice) {
        return { error: 'Cost price greater than selling price!' };
      } else {
        return { success: true };
      }
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default checkRules;
