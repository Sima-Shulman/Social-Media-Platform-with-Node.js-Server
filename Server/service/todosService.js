const db = require('../../database/createDB');

exports.queryAllTodos = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM todos');
    return rows;
  } catch (err) {
    throw new Error('Error fetching todos: ' + err.message);
  }
};
exports.queryTodoByUserId = async (userId) => {
  try {
    const [rows] = await db.query('SELECT * FROM todos WHERE userId = ?', [userId]);
    return rows;
  } catch (err) {
    throw new Error('Error fetching todos for user with ID: ' + userId + err.message);
  }
}
exports.queryTodoById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]);
    return rows;
  } catch (err) {
    throw new Error('Error fetching todo with ID: ' + rows.id + err.message);
  }
};
exports.postTodo = async ({ userId, title, completed }) => {
  try {
    const [result] = await db.query(
      'INSERT INTO todos (userId, title, completed) VALUES (?, ?, ?)',
      [userId, title, completed]
    );
    return { id: result.insertId, userId, title, completed };
  } catch (err) {
    throw new Error('Error posting todo: ' + err.message);
  }
};
exports.putTodo = async (id, { userId, title, completed }) => {
  try {
    const [result] = await db.query(
      'UPDATE todos SET userId = ?, title = ?, completed = ? WHERE id = ?',
      [userId, title, completed, id]
    );
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error updating todo: ' + err.message);
  }
};
exports.deleteTodo = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM todos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  } catch (err) {
    throw new Error('Error deleting todo: ' + err.message);
  }
};