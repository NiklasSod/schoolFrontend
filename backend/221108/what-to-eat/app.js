const express = require('express');
const app = express();
const dishController = require('./controllers/dishController');
const applicationsController = require('./controllers/applicationsController');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/dishes', dishController);
app.use('/api/register', applicationsController);

module.exports = app;
