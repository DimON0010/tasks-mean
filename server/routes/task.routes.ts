import { Router, Request, Response } from "express";
import { TaskController } from "../controllers/task.controller";

const router = Router();
const taskController = new TaskController;

router.get('/:taskId?', async (req: Request, res: Response) => {
  const result = await taskController.read(req.query, req.params.taskId);
  res.send(result);
});

router.post('/',  async (req: Request, res: Response) => {
  const result = await taskController.create(req.body);
  res.send(result);
});

router.patch('/:taskId', (req: Request, res: Response) => {
  const result = taskController.update(req.params.id, req.body);
  res.send(result);
})

router.delete('/:taskId', (req: Request, res: Response) => {
  const result = taskController.delete(req.params.taskId);
  res.send(result);
})

export default router;
