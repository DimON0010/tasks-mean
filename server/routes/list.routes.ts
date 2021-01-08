import { Request, Response, Router } from "express";
import { ListController } from "../controllers/list.controller";


const router = Router();
const listController = new ListController();

router.get('/', async (req: Request, res: Response) => {
  const result = await listController.read(req.params);
  res.send(result);
});

router.get('/:id', async (req: Request, res: Response) => {
  const result = await listController.read(null, req.params.id);
  res.send(result);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await listController.create(req.body);
  res.send(result);
});

//router.patch('/:id', listController.update);

router.delete('/', async (req: Request, res: Response) => {
  console.log('listRouter req.query: ' + req.query);
  const result = await listController.delete(req.query.id);
  res.send(result);
});

export default router;
