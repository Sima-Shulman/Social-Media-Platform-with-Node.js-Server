const { cwd } = require('process');
const db = require('../../DB/createDB');
exports.queryAllTodos = () => {
  try {
    const [rows] = db.query('SELECT * FROM todos');
    console.log('rows', rows);
    return rows;
  } catch (err) {
    throw new Error('Error fetching todos: ' + err.message);
  }
};
