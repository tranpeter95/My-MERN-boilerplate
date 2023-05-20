const express = require('express');
const path = require('path');

const app = express();

// will serve the static assets in build folder in client side, (index.html will be able to use css and bundle.js)
app.use(express.static(path.resolve(__dirname, '../client/build')));

// on visiting homepage, send index.html file
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.listen(5000, () => {
  console.log('listening on Port 5000');
});
