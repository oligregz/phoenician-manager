import axios from 'axios';

const updateProduct = async (data) => {
  try {
    const response = await axios.put('http://localhost:5945/api/v1/update-product', data);
    if (!response.data) {
      throw new Error('Error listing products')
    }
    return response.data;
  } catch (e) {
    console.error(e)
    throw e;
  }
};

export default updateProduct;