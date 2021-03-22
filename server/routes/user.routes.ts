import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthService } from "../services/auth.service";
import { joiMiddleware } from "../middleware";
import { userPostValidator, userGetQueryValidator, userPostLoginValidator } from "../models/joiSchemas";
import { ResponseService } from "../services/response.service";

const router = Router();
const userController = new UserController;

router.get('/',
  joiMiddleware(userGetQueryValidator, "query"),
  async (req: Request, res: Response) => {
    const result = await userController.read(req.query);
    res.send(result);
  }
);

router.post('/',
  joiMiddleware(userPostValidator, "body"),
  async (req: Request, res: Response) => {

    const result = await userController.create(
      { ...req.body, password: AuthService.hashPassword(req.body.password) }
    );

    res.send(result);
  }
);

router.post('/login',
  joiMiddleware(userPostLoginValidator, "body"),
  async (req: Request, res: Response) => {

    const user = await AuthService.userLogin(req.body.email, req.body.password);
    if (user === null) {
      res.send(ResponseService.badRes('Invalid user data.'));
    } else {

      const userFullName = user.firstName + ' ' + user.lastName;

      const session = AuthService.createJWT(process.env.JWT_SECRET, {
        id: user._id,
        userName: userFullName,
        dateCreated: new Date().toLocaleString("en-US", { timeZone: "UTC" })
      });

      res.send(session);
    }
  },

  router.get('/current',
    async (req: Request, res: Response) => {

      const tokenUser = AuthService.decodeSession(process.env.JWT_SECRET, req.header('X-JWT-Token'))
      if(tokenUser.type === 'valid') {
        res.send(ResponseService.successRes(tokenUser.session.userName));
        return;
      }
      res.send(ResponseService.badRes("Incorrect token data."))
    }
  )
);


export default router;
