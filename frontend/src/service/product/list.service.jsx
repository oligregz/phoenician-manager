import axios from "axios";

const listProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5945/api/v1/product");
    if (!response.data) {
      throw new Error('Error listing products')
    }
    return response.data;
  } catch (e) {
    console.error(e)
    throw e;
  }
};

export default listProducts;