import {Router, Request, Response} from "express";
import {TaskController} from "../controllers/task.controller";
import {joiMiddleware} from "../middleware";
import {joiSchemas, taskPatchParamsValidator,
        taskPatchBodyValidator, taskPostBodyValidator,
        taskDeleteParamsValidator} from "../models";

const router = Router();
const taskController = new TaskController;


router.get('/',
  joiMiddleware(joiSchemas.Task.taskQuery, 'query'),
  async (req: Request, res: Response) => {
    const result = await taskController.read(req.query);
    res.send(result);
  });

router.get('/:taskId',
  joiMiddleware(joiSchemas.Task.taskParams, 'params'),
  async (req: Request, res: Response) => {
    const result = await taskController.read(req.query, req.params.taskId);
    res.send(result);
  });

router.post('/',
  joiMiddleware(taskPostBodyValidator, 'body'),
  async (req: Request, res: Response) => {
    const result = await taskController.create(req.body);
    res.send(result);
  });

router.patch('/:taskId',
  // this place could be improved
  joiMiddleware(taskPatchParamsValidator, 'params'),
  joiMiddleware(taskPatchBodyValidator, 'body'),
  (req: Request, res: Response) => {
    const result = taskController.update(req.params.taskId, req.body);
    res.send(result);
  });

router.delete('/:taskId',
  joiMiddleware(taskDeleteParamsValidator, 'params'),
  (req: Request, res: Response) => {
    const result = taskController.delete(req.params.taskId);
    res.send(result);
  });

export default router;
