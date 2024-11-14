import { Router } from 'express';
import { addTask, getTaskList, taskDelete, editTask, getTaskList_User} from '../controllers/taskController.js';
const router = Router();


router.post('/add-task', addTask);
router.get('/get-list', getTaskList);
router.patch('/edit-task/:id', editTask);
router.delete("/delete-task/:id", taskDelete);
router.get('/get-list-user', getTaskList_User);



export default router;