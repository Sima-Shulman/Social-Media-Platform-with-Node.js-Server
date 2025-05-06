const db = require('../../DB/createDB');

exports.queryAllTodos = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM todos'); // <-- await
    return rows;
  } catch (err) {
    throw new Error('Error fetching todos: ' + err.message);
  }
};
exports.queryTodoById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM todos WHERE id = ?', [id]); // <-- await
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