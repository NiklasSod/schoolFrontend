const router = require('express').Router();
const dishModel = require('../models/dishModel');

router.get('/', dishModel.getAllDishes);
router.post('/', dishModel.createNewDish);
router.put('/:id', dishModel.updateDish);
router.get('/:id', dishModel.getOneDish);
router.delete('/:id', dishModel.deleteDish);

module.exports = router;
