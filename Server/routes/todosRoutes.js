import {express} from 'express';
import {getAllTodos} from '../controllers/todoController.js';
import { get } from 'http';
const router =express.Router();

router.get('/todos', getAllTodos);


app.listen(8080, () => {
  console.log('Server is running on port 3000');
});