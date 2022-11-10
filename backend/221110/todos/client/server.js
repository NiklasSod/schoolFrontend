const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI_LESS4;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

mongoose.connect(MONGO_URI, err => {
  if (err) {
    console.log(err);
    return;
  };
  console.log('Connected to DB');
});
