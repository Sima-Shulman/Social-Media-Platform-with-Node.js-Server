const express = require('express');
const { getAllPosts, getPostById,createPost,updatePost, removePost } = require('../controllers/postController');
const router =express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/',createPost)
router.put('/:id',updatePost)
router.delete('/:id', removePost);
module.exports = router;