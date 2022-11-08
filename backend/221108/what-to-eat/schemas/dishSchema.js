const mongoose = require('mongoose');

const dishSchema = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  // },
  name: {
    type: String,
    required: true,
  }
}, {
  timeStamps: true
});

module.exports = mongoose.model('Dish', dishSchema);
