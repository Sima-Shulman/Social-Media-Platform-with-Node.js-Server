const {queryAllComments, queryCommentById, postComment, putComment, deleteComment} = require('../service/commentsService');
exports.getAllComments = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await queryAllComments(postId);
        if (!comments || comments.length === 0) {
            return res.status(404).json({ error: 'No comments found' });
        }
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.getCommentById = async (req, res) => {
    try {
        const id = req.params.id
        const comment = await queryCommentById(id);
        if (!comment || comment.length === 0) {
            return res.status(404).json({ error: 'Comment with id:' + comment.id + ' not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.createComment = async (req, res) => {
    try {
        const comment = await postComment(req.body);
        if (!comment || comment.length === 0) {
            return res.status(404).json({ error: 'Comment with id:' + comment.id + ' cannot be created' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.updateComment = async (req, res) => {
    try {
        const id = req.params.id
        const isUpdate = await putComment(id, req.body);
        if (!isUpdate) {
            return res.status(404).json({ error: 'Comment with id:' + comment.id + ' not found' });
        }
        res.status(200).json('comment' + id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.removeComment = async (req, res) => {
    try {
        const id = req.params.id
        const isDelete = await deleteComment(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'Comment with id:' + comment.id + ' not found' });
        }
        res.status(200).json('comment' + id + ' deleted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
