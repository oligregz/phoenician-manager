import axios from 'axios';

const updateProduct = async (data) => {
  try {
    const response = await axios.put('http://localhost:5945/api/v1/update-product', data);
    console.log('Resposta da requisição:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erro na requisição PUT:', error);
    throw error;
  }
};

export default updateProduct;