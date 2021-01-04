import { User } from '../db/models/user.model'

export class AuthService {
    constructor() { }

    public async login(req, res): Promise<any> {
        let {email, password} = req.body;

        User.findByCredentials(email, password).then((user) => {
            return user.createSession().then((refreshToken) => {
                return user.generateAccesAuthToken().then((accessToken) => {
                    return {accessToken, refreshToken}
                });
            }).then((authTokens) => {
                res
                    .header('x-refresh-token', authTokens.refreshToken)
                    .header('x-access-token', authTokens.accessToken)
                    .send(user);
            })
        }).catch((e) => {
            res.status(400).send(e);
        })
    }


    public async registration(req, res) {
        let newUser = new User(req.body);

        newUser.save().then(() => {
            return newUser.createSession();
        }).then((refreshToken) => {
            return newUser.generateAccesAuthToken().then((accessToken) => {
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

    public async
}