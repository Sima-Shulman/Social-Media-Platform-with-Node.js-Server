const db = require('../db.js');
exports.queryAllTodos = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM todos');
      return rows;
    } catch (err) {
      throw new Error('Error fetching todos: ' + err.message);
    }
 };
