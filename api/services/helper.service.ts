import { Task, User } from '../models';
import { NextFunction, Request, Response } from "express";
import {IUser} from "../models/user.model";
const jwt = require('jsonwebtoken');

export class HelperService {
    constructor() {
    }

    deleteTaskFromList(_listId: string) {
        Task.deleteMany({
            _listId
        })
    }
    authenticate(req: Request, res: Response, next: NextFunction) {
        let token = req.headers['x-access-token'];
        jwt.verify(token, User.getJWTSecret(), (err: Error, decoded: Object) => {
            if(err) {
                res.status(401).send(err);
            } else {
                req.user_id = decoded._id;
                next();
            }
        })
    }

    verifySession(req: Request, res: Response, next: NextFunction) {
        let refreshToken = req.header('x-refresh-token');
        let _id = req.header('_id');

        User.findByIdAndToken(_id, refreshToken).then((user) => {
            if(!user) {
                return Promise.reject({'error': 'User not found, make sure that the refresh token and id are correct'
                });
            }

            req.user_id = user._id;
            req.userObject = user;
            req.refreshToken = refreshToken;

            let isSessionValid = false;

            user.sessions.forEach((session: IUser['sessions']) => {
                if(session.token === refreshToken) {
                    if(User.hasRefreshTokenExpired(session.expiredAt) === false) {
                        isSessionValid = true;
                    }
                }
            })

            if(isSessionValid) {
                next()
            } else {
                return Promise.reject({
                    'error': 'Refresh token has expired or the session is invalid.'
                })
            }

        }).catch((e: Error) => {
            res.status(401).send(e);
        })

    }

}
