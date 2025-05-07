const express = require('express');
const { getAllUsers, getUserById, createUser, /*updateUser, removeUser*/ } = require('../controllers/userController');
const router = express.Router();
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
// router.put('/:id', updateUser);
// router.delete('/:id', removeUser);
module.exports = router;