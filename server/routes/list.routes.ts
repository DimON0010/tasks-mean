import {Request, Response, Router} from "express";
import {ListController} from "../controllers/list.controller";
import {joiMiddleware} from "../middleware";
import {joiSchemas} from "../models";

const router = Router();
const listController = new ListController();

router.get('/',
  joiMiddleware(joiSchemas.List.listQuery, 'query'),
  async (req: Request, res: Response) => {
    const result = await listController.read(req.query, req.params.listId);
    res.send(result);
  });

router.get('/:listId',
  joiMiddleware(joiSchemas.List.listParams, 'params'),
  async (req: Request, res: Response) => {
    const result = await listController.read(req.query, req.params.listId);
    res.send(result);
  });

router.post('/',
  joiMiddleware(joiSchemas.List.listBody, 'body'),
  async (req: Request, res: Response) => {
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
  joiMiddleware(joiSchemas.List.listParams, 'params'),
  async (req: Request, res: Response) => {
    const result = await listController.delete(req.params.listId);
    res.send(result);
  });

export default router;
