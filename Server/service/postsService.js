const db = require('../../database/createDB');

exports.queryAllPosts = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM posts');
    return rows;
  } catch (err) {
    throw new Error('Error fetching posts: ' + err.message);
  }
};
exports.queryPostByUserId = async (userId) => {
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE userId = ?', [userId]);
    return rows;
  } catch (err) {
    throw new Error('Error fetching posts for user with ID: ' + userId + err.message);
  }
}
exports.queryPostById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE id = ?', [id]);
    return rows;
  } catch (err) {
    throw new Error('Error fetching post with ID: ' + rows.id + err.message);
  }
};
exports.postPost = async ({ userId, title, body }) => {
  try {
    const [result] = await db.query(
      'INSERT INTO posts (userId, title, body) VALUES (?, ?, ?)',
      [userId, title, body]
    );
    return { id: result.insertId, userId, title, body };
  } catch (err) {
    throw new Error('Error posting Post: ' + err.message);
  }
};
exports.putPost = async (id, { userId, title, body }) => {
  try {
    const [result] = await db.query(
      'UPDATE posts SET userId = ?, title = ?, body = ? WHERE id = ?',
      [userId, title, body, id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error updating Post: ' + err.message);
  }
};
exports.deletePost = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM posts WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error deleting Post: ' + err.message);
  }
};