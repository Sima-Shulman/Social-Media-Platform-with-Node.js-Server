const express = require('express');
const { getAllTodos } = require('../controllers/todoController');
const router =express.Router();

router.get('/', getAllTodos);


module.exports = router;