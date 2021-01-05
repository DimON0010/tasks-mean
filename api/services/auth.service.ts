import User  from '../models/user.model'
import { Request, Response } from "express";

export class AuthService {
    constructor() { }

    public async login(req: Request, res: Response): Promise<any> {
        let {email, password} = req.body;

        User.findByCredentials(email, password).then((user) => {
            return user.createSession().then((refreshToken: string) => {
                return user.generateAccesAuthToken().then((accessToken: string) => {
                    return {accessToken, refreshToken}
                });
            }).then((authTokens: string) => {
                res
                    .header('x-refresh-token', authTokens.refreshToken)
                    .header('x-access-token', authTokens.accessToken)
                    .send(user);
            })
        }).catch((e) => {
            res.status(400).send(e);
        })
    }


    public async registration(req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save().then(() => {
            return newUser.createSession();
        }).then((refreshToken) => {
            return newUser.generateAccesAuthToken().then((accessToken: string) => {
                return {accessToken, refreshToken}
            })
        }).then((authTokens) => {
            res
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(newUser);
        }).catch((e) => {
            res.status(400).send(e);
        })
    }
}
