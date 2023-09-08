import listProducts from "../service/product/list.service";

const getName = async (code) => {
  try {
    const allProducts = await listProducts();
    const name = allProducts.products.filter((p) => {
      return p.code === code
    });
    console.log(name);
    return name;
  } catch (e) {
    console.error("Error when finding products:", e);
    throw e;
  }
}

const getCurrentPrice = async (code) => {
  try {
    const allProducts = await listProducts();
    const currentPrice = allProducts.products.filter((p) => {
      return p.code === code
    });
    console.log(currentPrice);
    return currentPrice;
  } catch (e) {
    console.error("Error when finding products:", e);
    throw e;
  }
}

export {
  getName,
  getCurrentPrice
} ;