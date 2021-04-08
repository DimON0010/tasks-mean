import { Request, Response, Router } from "express";
import { ListController } from "../controllers/list.controller";
import { TaskController } from "../controllers/task.controller";
import { joiMiddleware, requireJwtMiddleware } from "../middleware";
import { joiSchemas, listGetParamValidator, listGetTasksQueryValidator,
         listDeleteParamsValidator, listPostBodyValidator, listGetQueryValidator } from "../models";
import { AuthService } from "../services/auth.service";

const router = Router();
const listController = new ListController();
const taskController = new TaskController();

router.get('/',
  joiMiddleware(listGetQueryValidator, 'query'),
  requireJwtMiddleware(),
  async (req: Request, res: Response) => {

    const tokenUser = AuthService.decodeSession(process.env.JWT_SECRET, req.header('X-JWT-Token'));
    const result = await listController.read({_userId: tokenUser?.session?.id }, req.params.listId);

    res.send(result);
  });

router.get('/:_listId',
  joiMiddleware(listGetParamValidator, 'params'),
  joiMiddleware(listGetTasksQueryValidator, 'query'),
  requireJwtMiddleware(),
  async (req: Request, res: Response) => {
    if(req.query?.withTasks && req.query?.withTasks === 'true') {

      const list = await listController.read(req.query, req.params._listId);
      const tasks = await taskController.read(req.params);

      res.send({list: {list,
                       tasks: tasks
                      },
              });
      return;
    }
    const result = await listController.read(req.query, req.params._listId);
    res.send(result);
  });

router.post('/',
  joiMiddleware(listPostBodyValidator, 'body'),
  requireJwtMiddleware(),
  async (req: Request, res: Response) => {
    const tokenUser = AuthService.decodeSession(process.env.JWT_SECRET, req.header('X-JWT-Token'))
    req.body = {_userId: tokenUser?.session?.id , ...req.body}
    const result = await listController.create(req.body);
    res.send(result);
  });

router.patch('/:listId',
  joiMiddleware(joiSchemas.List.listParams, 'params'),
  joiMiddleware(joiSchemas.List.listPatchBody, 'body'),
  async (req: Request, res: Response) => {
    const result = await listController.update(req.params.listId, req.body);
    res.send(result);
  });

router.delete('/:listId',
  joiMiddleware(listDeleteParamsValidator, 'params'),
  async (req: Request, res: Response) => {
    const result = await listController.delete(req.params.listId);
    res.send(result);
  });

export default router;
