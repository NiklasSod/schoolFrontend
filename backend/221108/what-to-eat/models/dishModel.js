const Dish = require('../schemas/dishSchema');

exports.getAllDishes = (req, res) => {
  Dish.find({
    // query, empty object = all
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong when getting the dishes'
      });
    };
    res.status(200).json(data);
  });
};

exports.getOneDish = (req, res) => {
  Dish.findOne({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong trying to get the dish',
        err: err.message
      });
    };
    if (!data) {
      return res.status(404).json({
        message: 'Could not find that dish'
      });
    };
    res.status(200).json(data);
  });
};

exports.createNewDish = (req, res) => {
  Dish.create({
    name: req.body.name
  }, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong when creating the dish'
      });
    };
    res.status(201).json(data);
  });
};

exports.updateDish = (req, res) => {
  Dish.findOneAndUpdate({ _id: req.params.id }, req.body, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong trying to update the dish',
        err: err.message
      });
    };
    if (!data) {
      return res.status(404).json({
        message: 'Could not find that dish'
      });
    };
    res.status(200).json(data);
  });
};

exports.deleteDish = (req, res) => {
  Dish.findOneAndDelete({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong trying to delete the dish',
        err: err.message
      });
    };
    if (!data) {
      return res.status(404).json({
        message: 'Could not find that dish'
      });
    };
    res.status(200).json({ id: data._id });
  });
};
