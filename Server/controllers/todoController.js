const { queryAllTodos } = require('../service/todosService.js');
exports.getAllTodos = (req, res) => {
    try {
        const todos = queryAllTodos();
        if (!todos) {
            return res.status(404).json({ error: 'No todos found' });
        }
        console.log('todos', todos);
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
