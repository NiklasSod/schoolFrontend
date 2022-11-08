const router = require('express').Router();
const dishModel = require('../models/dishModel');
const auth = require('../middleware/auth');

router.get('/', auth.validateApiKey, dishModel.getAllDishes);
router.get('/random', dishModel.getRandomDishes);
router.get('/:id', dishModel.getOneDish);
router.post('/', dishModel.createNewDish);
router.put('/:id', dishModel.updateDish);
router.delete('/:id', dishModel.deleteDish);

module.exports = router;
