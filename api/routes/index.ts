import Router from "express";

import users from './user.routes';
import tasks from './task.routes';
import lists from './list.routes';

const router = Router();

router.use('/users', users);
router.use('/tasks', tasks);
router.use('/lists', lists);


export default router;
