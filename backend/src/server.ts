import  Express  from 'express';
import ProductController from './controller/Product.controller';
import PackController from './controller/Pack.controller';
import { validateProduct } from './middlewares/validate_product.middleware';
import cors from 'cors';

const app = Express();
app.use(Express.json());
const PORT = 5945;

app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.get('/api/v1', (req, res) => {
  return res.send({ message: 'Success on Get request' });
});

app.get('/api/v1/pack', PackController.listPacks);
app.get('/api/v1/pack/:id', PackController.getPack);
app.get('/api/v1/product', ProductController.listProducts);
app.get('/api/v1/product/:code', ProductController.getProduct);
app.get('/api/v1/updated-products', ProductController.getUpdatedProducts);

app.post('/api/v1/create-product', ProductController.createProduct);
app.post('/api/v1/create-pack', PackController.createPack);

app.put('/api/v1/update-pack', PackController.updatePack);
app.put('/api/v1/update-product', validateProduct, ProductController.updateProduct);

app.delete('/api/v1/delete-pack/:id', PackController.deletePack);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});