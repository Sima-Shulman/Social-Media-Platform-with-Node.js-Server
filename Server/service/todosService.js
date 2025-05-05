const db = require('../db.js');
export function queryAllTodos () {
    db.query('SELECT * FROM todos', (err, result) => {
        if (err) throw err;
        console.log("comments table created");
        console.log("hello")    });
}