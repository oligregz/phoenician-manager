import listProducts from "../service/product/list.service";

const filterProduct = async (prod) => {
  try {
    const allProducts = await listProducts();
    const product = allProducts.products.filter((p) => {
      return prod.code === p.code
    });
    if (!product) {
      return null;
    }
    return product[0];
  } catch (e) {
    console.error("Error when finding products:", e);
    throw e;
  }
} 

const checkRules = async (product) => {
  try {
    const filteredProduct = await filterProduct(product);

    const diferencePrice = Math.abs(product.salesprice - filteredProduct.salesprice);
    const maxAdjustmentPercentage = product.salesprice * 0.1
    
    if (!filteredProduct.code || !filteredProduct.salesprice) {
      console.log(filteredProduct[0].code)
      throw new Error('"code" or "salesprice" fields are not valid !')

    } else if (diferencePrice > maxAdjustmentPercentage) {
      throw new Error('Adjustment above 10% !')

    } else if (product.costprice > filteredProduct.salesprice) {
      throw new Error('Cost price greater than selling price!')

    } else {
      return true;
    }
  } catch (e) {
    console.error(e)
    throw e;
  }
}

export default checkRules;