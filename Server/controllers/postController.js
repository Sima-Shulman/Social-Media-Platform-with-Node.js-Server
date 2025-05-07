const { queryAllPosts, queryPostByUserId, queryPostById, postPost, putPost, deletePost } = require('../service/postsService.js');

exports.getAllPosts = async (req, res) => {
    try {
        const { userId } = req.query;
        if (userId) {
            const posts = await queryPostByUserId(userId);
            if (!posts || posts.length === 0) {
                return res.status(404).json({ error: 'No posts found for user with id:' + userId });
            }
            return res.status(200).json(posts);
        }
        const posts = await queryAllPosts();
        if (!posts || posts.length === 0) {
            return res.status(404).json({ error: 'No posts found' });
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.getPostById = async (req, res) => {
    try {
        const id = req.params.id
        const post = await queryPostById(id);
        if (!post || post.length === 0) {
            return res.status(404).json({ error: 'Post with id:' + id + ' not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.createPost = async (req, res) => {
    try {
        const post = await postPost(req.body);
        if (!post || post.length === 0) {
            return res.status(404).json({ error: 'Post with id:' + post.id + ' cannot be created' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.updatePost = async (req, res) => {
    try {
        const id = req.params.id
        const isUpdate = await putPost(id, req.body);
        if (!isUpdate) {
            return res.status(404).json({ error: 'Post with id:' + id + ' not found' });
        }
        res.status(200).json('post' + id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.removePost = async (req, res) => {
    try {
        const id = req.params.id
        const isDeleted = await deletePost(id);
        if (!isDeleted) {
            return res.status(404).json({ error: 'Post with id:' + id + ' not found' });
        }
        res.status(200).json('post' + id + ' deleted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
