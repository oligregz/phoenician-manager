import listProducts from "../service/product/list.service";

const getName = async (code) => {
  try {
    const allProducts = await listProducts();
    const product = allProducts.products.find((p) => p.code === code);
    if (product) {
      return product.name;
    } else {
      return "Product not found";
    }
  } catch (e) {
    console.error("Error when finding products:", e);
    throw e;
  }
}

const getCurrentPrice = async (code) => {
  try {
    const allProducts = await listProducts();
    const product = allProducts.products.find((p) => p.code === code);
    if (product) {
      return product.salesprice;
    } else {
      return "Price not found";
    }
  } catch (e) {
    console.error("Error when finding products:", e);
    throw e;
  }
}

export {
  getName,
  getCurrentPrice
} ;