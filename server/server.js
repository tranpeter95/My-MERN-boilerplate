// uses .env file that is gitignored for port instead of showing port
require('dotenv').config();

// various requires
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// will either use secret links in env, or hardcoded for ppl who forked
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/projectdb';
const port = process.env.PORT || 2000;

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

// 404
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// global err handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err });
});

// connect to db
mongoose
  .connect(MONGO_URI)
  .then(() => {
    //  only want to start listening after connecting to db
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
      console.log(`using database: ${MONGO_URI}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
