const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const dotEnv = require('dotenv');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/video');
const userRoutes = require('./routes/user');

const app = express();

dotEnv.config();
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/user', userRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0vjur.mongodb.net/${process.env.DB_COLLECTION}?retryWrites=true&w=majority`
  )
  .then(res => app.listen(process.env.PORT || 8080))
  .catch(err => console.log(err));
