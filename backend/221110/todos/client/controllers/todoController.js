const router = require('express').Router();
const todoModel = require('../models/todos/todoModel');
const auth = require('../middleware/auth');

router.get('/', todoModel.getAllTodos);
router.get('/myTodos', auth.verifyToken, todoModel.getMyTodos);
router.get('/:id', todoModel.getTodoById);

router.post('/', auth.verifyToken, todoModel.createNewTodo);

// router.put('/:id', auth.verifyToken, todoModel.updateTodo);

// exports.delete('')

module.exports = router;
