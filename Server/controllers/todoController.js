import {queryAllTodos} from '../service/todosService.js';
exports.getAllTodos= async (req, res) =>{
    try {
        const todos = await queryAllTodos();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
