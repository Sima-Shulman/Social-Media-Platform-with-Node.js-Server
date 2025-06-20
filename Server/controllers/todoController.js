const { queryAllTodos, queryTodoByUserId, queryTodoById, postTodo ,putTodo, deleteTodo } = require('../service/todosService.js');

exports.getAllTodos = async ( req, res)=>{
    try {
        const { userId } = req.query;
        if (userId) {
            const todos = await queryTodoByUserId(userId);
            if (!todos || todos.length === 0) {
                return res.status(404).json({ error: 'No todos found for user with id:' + userId });
            }
            return res.status(200).json(todos);
        }
        const todos = await queryAllTodos();
        if (!todos || todos.length === 0) {
            return res.status(404).json({ error: 'No todos found' });
        }
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}

exports.getTodoById = async (req, res) => { 
    try {
        const id = req.params.id
        const todo = await queryTodoById(id);
        if (!todo || todo.length === 0) {
            return res.status(404).json({ error: 'Todo with id:' + id + ' not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.createTodo = async (req, res) => { 
    try {
        const todo = await postTodo(req.body); 
        if (!todo || todo.length === 0) {
            return res.status(404).json({ error: 'Todo with id:' + todo.id + ' cannot be created' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.updateTodo = async (req, res) => { 
    try {
        const id = req.params.id
        const isUpdate= await putTodo(id, req.body);
        if (!isUpdate) {
            return res.status(404).json({ error: 'Todo with id:' + id + ' not found' });
        }
        res.status(200).json('todo'+id + ' updated');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
exports.removeTodo = async (req, res) => {
    try {
        const id = req.params.id
        const isDelete= await deleteTodo(id);
        if (!isDelete) {
            return res.status(404).json({ error: 'Todo with id:' + id + ' not found' });
        }
        res.status(200).json('todo'+id + ' deleted');
    } catch (error) {
        res.status(500).json({ error: 'Internal server error.'+error.message });
    }
}
