require('dotenv').config(); // uses .env file that is gitignored for port instead of showing port

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// express app
const app = express();

// always parses json
app.use(express.json());

// will serve the static assets in build folder in client side, (index.html will be able to use css and bundle.js)
app.use(express.static(path.resolve(__dirname, '../client/build')));

// on visiting homepage, send index.html file
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //  only want to start listening after connecting to db
    app.listen(process.env.PORT, () => {
      console.log('listening on Port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
