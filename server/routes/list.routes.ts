import { Router } from "express";
import { ListController } from "../controllers/list.controller";

const router = Router();

const listController = new ListController();

router.get('/', listController.read);

router.post('/', listController.create);

//router.patch('/:id', listController.update);

router.delete('/:id', listController.delete);

export default router;
