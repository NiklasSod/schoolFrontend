const Application = require('../schemas/applicationsSchema');
require('dotenv').config();

const API_MAX = process.env.API_MAX || 50;

exports.validateApiKey = (req, res, next) => {
  let host = req.headers.origin
  let api_key = req.query.api_key;

  Application.findOne({ api_key }, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Something went wrong when checking the api_key'
      });
    };
    if (!data) {
      return res.status(404).json({
        message: 'Could not find api_key'
      });
    };
    if (data.host !== host) {
      return res.status(403).json({
        message: 'The api key does not match the origin'
      });
    };
    let today = new Date().toISOString().split('T')[0];
    let index = data.usage.findIndex(day => day.date == today);
    if (index < 0) {
      // date not in array
      data.usage.push({ date: today, count: 1 });
    } else {
      // date in array already
      if (data.usage[index].count >= API_MAX) {
        // max api calls met
        return res.status(429).json({
          message: 'Max Api calls exceeded'
        });
      };
      // api calls ok, more can be made
      data.usage[index].count++;
      console.log('API calls: ' + data.usage[index].count)
    };
    Application.updateOne({ _id: data._id }, { usage: data.usage }, (err) => {
      if (err) {
        return res.status(500).json({
          message: 'Something went wrong'
        });
      };
    });

    console.log('API key valid');
    next();
  });
};