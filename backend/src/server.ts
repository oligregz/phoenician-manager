import  Express  from 'express';
import ProductController from './controller/Product.controller';
import PackController from './controller/Pack.controller';

const app = Express();
app.use(Express.json());
const PORT = 5945;

app.get('/api/v1', (req, res) => {
  return res.send({ message: 'Success on Get request' });
});

app.get('/api/v1/pack', PackController.listPacks);
app.get('/api/v1/pack/:id', PackController.getPack);
app.get('/api/v1/product', ProductController.listProducts);
app.get('/api/v1/product/:code', ProductController.getProduct);

app.post('/api/v1/create-product', ProductController.createProduct);
app.post('/api/v1/create-pack', PackController.createPack);

app.put('/api/v1/update-pack', PackController.updatePack);

app.delete('/api/v1/delete-pack/:id', PackController.deletePack);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});