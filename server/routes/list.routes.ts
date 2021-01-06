import { Router, Request, Response } from "express";
import { ListController } from "../controllers/list.controller";
// import { HelperService } from "../services/helper.service";

const router = Router();
// const helperService = new HelperService();

router.get('/', ListController.read);

router.post('/', ListController.create);

router.patch('/:id', ListController.update);

router.delete('/:id', ListController.delete);

export default router;
