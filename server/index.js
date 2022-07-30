import express from 'express';
import cors from 'cors';
import { data } from './data.js';
import mongoose from 'mongoose';
import config from './config.js';
import userRouter from './routers/userRouter.js';
import bodyParser from 'body-parser';

mongoose
.connect(config.MONGODB_URL)
.then (() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.log(err));
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRouter);

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.get("/api/products/:id", (req, res) => {
  const product = data.products.find(product => product._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

//Maneja los errores en express
app.use((err, req, res, next)=>{
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

