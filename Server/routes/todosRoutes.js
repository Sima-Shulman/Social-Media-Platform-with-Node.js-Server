const express = require('express');
const { getAllTodos, getTodoById,createTodo } = require('../controllers/todoController');
const router =express.Router();

router.get('/', getAllTodos);
router.get('/:id', getTodoById);
router.post('/',createTodo)

module.exports = router;