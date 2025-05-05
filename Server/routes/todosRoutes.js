import {express} from 'express';
import {getAllTodos} from '../controllers/todoController.js';
import { get } from 'http';
const router =express.Router();

router.get('/', getAllTodos);


module.exports = router;