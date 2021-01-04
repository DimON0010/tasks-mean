import { Router, Request, Responce } from "express";
import {AuthService} from "../services/auth.service";
import {HelperService} from "../services/helper.service";

const router = Router();

router.post('/', AuthService.registration);

router.post('/login', AuthService.login);

router.get('/me/access-token', HelperService.verifySession, (req: Request, res: Responce) => {
    req.userObject.generateAccesAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
})

export default router;