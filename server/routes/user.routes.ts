import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthService } from "../services/auth.service";
import { joiMiddleware } from "../middleware";
import { userPostValidator, userGetQueryValidator, userPostLoginValidator} from "../models/joiSchemas";

const router = Router();
const userController = new UserController;

router.get('/',
joiMiddleware(userGetQueryValidator, "query"),
async (req: Request, res: Response) => {
  const result = await userController.read(req.query);
  res.send(result);
}
);

// router.get('/userId',
// joiMiddleware(userGetParamValidator, "params"),
// async (req: Request, res: Response) => {
//   const result = await userController.read(req.params);
//   res.send(result);
// }
// );

router.post('/',
joiMiddleware(userPostValidator, "body"),
async (req: Request, res: Response) => {

  const result = await userController.create(
    {...req.body, password: AuthService.hashPassword(req.body.password)}
    );

  res.send(result);
}
);

router.post('/login',
  joiMiddleware(userPostLoginValidator, "body"),
  async (req: Request, res: Response) => {
    const result = await AuthService.userLogin(req.body.email, req.body.password);
    res.send(result);
  }
);


export default router;
