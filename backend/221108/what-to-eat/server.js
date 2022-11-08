const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const serverURI = 'http://localhost:' + PORT;

const MONGO_URI = process.env.MONGO_URI_LESS3;

mongoose.connect(MONGO_URI, (err) => {
  if (err) {
    console.log(err.message);
    return;
  };
  console.log('Connected to DB');
});

app.listen(PORT, () => {
  console.log('Server running on: ' + serverURI);
});
