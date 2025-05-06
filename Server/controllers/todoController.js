const { queryAllTodos, queryTodoById, postTodo } = require('../service/todosService.js');

exports.getAllTodos = async (req, res) => { // <-- הפונקציה צריכה להיות async
    try {
        const todos = await queryAllTodos();
        if (!todos || todos.length === 0) {
            return res.status(404).json({ error: 'No todos found' });
        }
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.getTodoById = async (req, res) => { // <-- הפונקציה צריכה להיות async
    try {
        const id = req.params.id
        const todo = await queryTodoById(id);
        if (!todo || todo.length === 0) {
            return res.status(404).json({ error: 'Todo with id:' + todo.id + ' not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.createTodo = async (req, res) => { // <-- הפונקציה צריכה להיות async
    try {
        const todo = await postTodo(req.body); 
        if (!todo || todo.length === 0) {
            return res.status(404).json({ error: 'Todo with id:' + todo.id + ' cannot be created' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
