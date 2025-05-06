const db = require('../../database/createDB');

exports.queryAllComments = async (postId) => {
    try {
        const [rows] = await db.query('SELECT * FROM comments WHERE postId = ?', [postId]);
        return rows;
    } catch (err) {
        throw new Error('Error fetching comments: ' + err.message);
    }
}

exports.queryCommentById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM comments WHERE id = ?', [id]);
        return rows;
    } catch (err) {
        throw new Error('Error fetching comment with ID: ' + id + err.message);
    }
}
exports.postComment = async ({ postId, name, email, body }) => {
    try {
        const [result] = await db.query(
            'INSERT INTO comments (postId, name, email, body) VALUES (?, ?, ?, ?)',
            [postId, name, email, body]
        );
        return { id: result.insertId, postId, name, email, body };
    } catch (err) {
        throw new Error('Error posting Comment: ' + err.message);
    }
}
exports.putComment = async (id, { postId, name, email, body }) => {
    try {
        const [result] = await db.query(
            'UPDATE comments SET postId = ?, name = ?, email = ?, body = ? WHERE id = ?',
            [postId, name, email, body, id]
        );
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error updating Comment: ' + err.message);
    }
}
exports.deleteComment = async (id) => {
    try {
        const [result] = await db.query('DELETE FROM comments WHERE id = ?', [id]);
        return result.affectedRows > 0;
    } catch (err) {
        throw new Error('Error deleting Comment: ' + err.message);
    }
}