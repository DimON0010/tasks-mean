import { Request, Response, Router } from "express";
import { ListController } from "../controllers/list.controller";


const router = Router();
const listController = new ListController();

router.get('/', async (req: Request, res: Response) => {
  const result = await listController.read(req.params);
  res.send(result);
});

router.post('/', async (req: Request, res: Response) => {
  const result = await listController.create(req.body);
  res.send(result);
});

//router.patch('/:id', listController.update);

router.delete('/:id', listController.delete);

export default router;
