const router = require('express').Router();
const dishModel = require('../models/dishModel');
const auth = require('../middleware/auth');

router.get('/', auth.validateApiKey, dishModel.getAllDishes);
router.get('/random', auth.validateApiKey, dishModel.getRandomDishes);
router.get('/:id', auth.validateApiKey, dishModel.getOneDish);
router.post('/', auth.validateApiKey, dishModel.createNewDish);
router.put('/:id', auth.validateApiKey, dishModel.updateDish);
router.delete('/:id', auth.validateApiKey, dishModel.deleteDish);

module.exports = router;
