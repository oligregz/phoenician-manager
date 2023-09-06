import  Express  from 'express';

const app = Express();
app.use(Express.json());
const PORT = 5945;

app.get('/', (req, res) => {
  return res.send({ message: 'Success on Get request' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});