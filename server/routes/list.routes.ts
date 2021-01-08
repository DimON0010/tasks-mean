import { Request, Response, Router } from "express";
import { ListController } from "../controllers/list.controller";


const router = Router();
const listController = new ListController();

router.get('/:listId?', async (req: Request, res: Response) => {
  const result = await listController.read(req.query, req.params.listId);
  res.send(result);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await listController.create(req.body);
  res.send(result);
});

router.patch('/:listId', async (req: Request, res: Response) => {
  const result = await listController.update(req.params.listId, req.body);
  res.send(result);
});

router.delete('/:listId', async (req: Request, res: Response) => {
  const result = await listController.delete(req.params.listId);
  res.send(result);
});

export default router;
