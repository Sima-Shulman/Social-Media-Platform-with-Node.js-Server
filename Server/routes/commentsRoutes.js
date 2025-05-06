const express = require('express');
const { getAllComments, getCommentById, createComment, updateComment, removeComment } = require('../controllers/commentController');
const router = express.Router({ mergeParams: true });

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', removeComment);

module.exports = router;