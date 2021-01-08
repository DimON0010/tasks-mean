import { Router, Request, Response } from "express";
import { Task, List } from "../models";
import { HelperService } from "../services/helper.service";
import {ITask} from "../models/task.model";
import { TaskController } from "../controllers/task.controller";

const router = Router();
const taskController = new TaskController;

router.get('/', async (req: Request, res: Response) => {
  console.log(req.query._id);
  const result = await taskController.read(req.query, req.query.id);
  res.send(result);
});

router.post('/',  async (req: Request, res: Response) => {
  const result = await taskController.create(req.body);
  res.send(result);
});

// router.patch('/:taskId', (req: Request, res: Response) => {
//   const result = taskController.update(id, req.data);
//   res.send(result);
// })

router.delete('/:taskId', (req: Request, res: Response) => {
  console.log('req.params.taskId: ' + req.params.taskId);
  const result = taskController.delete(req.params.taskId);
  res.send(result);
})

export default router;
