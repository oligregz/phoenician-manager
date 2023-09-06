import  Express  from 'express';
import ProductController from './controller/Product.controller';
import PackController from './controller/Pack.controller';

const app = Express();
app.use(Express.json());
const PORT = 5945;

app.get('/api/v1', (req, res) => {
  return res.send({ message: 'Success on Get request' });
});

app.post('/api/v1/create-product', ProductController.createProduct);
app.post('/api/v1/create-pack', PackController.createPack);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});