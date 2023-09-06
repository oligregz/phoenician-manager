import  Express  from 'express';
import ProductController from './controller/Product.controller';

const app = Express();
app.use(Express.json());
const PORT = 5945;

app.get('/api/v1', (req, res) => {
  return res.send({ message: 'Success on Get request' });
});

app.post('/api/v1/create-product', ProductController.createProduct);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});