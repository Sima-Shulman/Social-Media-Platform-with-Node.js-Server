const express = require('express');
const { getAllPosts, getPostById,createPost,updatePost, removePost } = require('../controllers/postController');
const router =express.Router();
const commentsRouter = require('./commentsRoutes');

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/',createPost)
router.put('/:id',updatePost)
router.delete('/:id', removePost);
router.use('/:postId/comments', commentsRouter);
module.exports = router;