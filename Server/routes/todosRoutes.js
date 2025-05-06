const express = require('express');
const { getAllTodos, getTodoById,createTodo,updateTodo ,removeTodo} = require('../controllers/todoController');
const router =express.Router();

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/',createTodo)
router.put('/:id',updateTodo)
router.delete('/:id', removeTodo);
module.exports = router;