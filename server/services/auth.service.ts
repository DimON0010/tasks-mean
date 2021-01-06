import { User, IUser } from '../models/user.model'
import { Request, Response } from "express";

// export class AuthService {
//     constructor() { }
//
//     public async login(req: Request, res: Response): Promise<any> {
//         let {email, password} = req.body;
//
//         User.findByCredentials(email, password).then((user: typeof User) => {
//             return user.createSession().then((refreshToken: string) => {
//                 return user.generateAccesAuthToken().then((accessToken: string) => {
//                     return {accessToken, refreshToken}
//                 });
//             }).then((authTokens: string) => {
//                 res
//                     .header('x-refresh-token', authTokens.refreshToken)
//                     .header('x-access-token', authTokens.accessToken)
//                     .send(user);
//             })
//         }).catch((e) => {
//             res.status(400).send(e);
//         })
//     }
//
//
//     public async registration(req: Request, res: Response) {
//         let newUser = new User(req.body);
//
//         newUser.save().then(() => {
//             return newUser.createSession();
//         }).then((refreshToken) => {
//             return newUser.generateAccesAuthToken().then((accessToken: string) => {
//                 return {accessToken, refreshToken}
//             })
//         }).then((authTokens) => {
//             res
//                 .header('x-refresh-token', authTokens.refreshToken)
//                 .header('x-access-token', authTokens.accessToken)
//                 .send(newUser);
//         }).catch((e) => {
//             res.status(400).send(e);
//         })
//     }
  //UserSchema.statics.findByCredentials(email: string, password: string) {
  //   return this.findOne({ email }).then((user: IUser) => {
  //     if(!user) return Promise.reject();
  //
  //     return new Promise((resolve, reject) => {
  //       bcrypt.compare(password, user.password, (err: Error, res: boolean) => {
  //         if (res) resolve(user);
  //         else {
  //           reject();
  //         }
  //       })
  //     })
  //   })
  // }

  /* MIDDLEWARE */
  // UserSchema.pre('save', function(next) {
  //   let costFactor = 10;
  //   if (this.isModified('password')) {
  //     bcrypt.genSalt(costFactor, (err: Error, salt: string) => {
  //       bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
  //         this.password = hash;
  //         next();
  //       })
  //     })
  //   } else {
  //     next();
  //   }
  // })

  // UserSchema.methods.toJSON = function() {
  //   const userObject = this.toObject();
  //   return _.omit(userObject, ['password', 'sessions']);
  // }
  //
  // UserSchema.methods.generateAccessAuthToken = function() {
  //   let user = this;
  //   return new Promise((resolve, reject) => {
  //     jwt.sign({_id: user._id.toHexString()}, jwtSecret, { expiresIn: '15m'}, (err: Error | null, token: string | undefined) => {
  //       if(!err) {
  //         resolve(token)
  //       } else {
  //         reject()
  //       }
  //     })
  //   });
  // }
  //
  // UserSchema.methods.generateRefreshAuthToken = function() {
  //   return new Promise( (resolve) => {
  //     crypto.randomBytes(64, (err: Error | null, buf: Buffer) => {
  //       if(!err) {
  //         let token = buf.toString('hex');
  //         return resolve(token);
  //       }
  //     })
  //   })
  // }
  //
  // UserSchema.methods.createSession = function() {
  //   let user = this;
  //
  //   return this.generateAccesAuthToken().then((refreshToken: string | undefined) => {
  //     return saveSessionToDatabase(user, refreshToken);
  //   }).then((refreshToken: string | undefined) => {
  //     return refreshToken;
  //   }).catch((e: Error | null) => {
  //     return Promise.reject('Failed to save session to database. \n' + e)
  //   })
  // }
  //
  //
  // /* HELPER METHODS */
  // let saveSessionToDatabase = (user: IUser, refreshToken: string | undefined) => {
  //   return new Promise((resolve, reject) => {
  //     let expiresAt = generateRefreshTokenExpiryTime();
  //
  //     user.sessions.push({token: refreshToken, expiresAt});
  //
  //     user.save().then(() => {
  //       return resolve(refreshToken);
  //     }).catch((e: Error | null) => {
  //       reject(e)
  //     });
  //   });
  // }
  //
  // let generateRefreshTokenExpiryTime = () => {
  //   let daysUntilExpired: string = '10';
  //   let secondsUntilExpired = ((24 * Number(daysUntilExpired) * 60) * 60);
  //
  //   return ((Date.now() / 1000) + secondsUntilExpired);
  // }
  //
  // /* MODAL METHODS(static methods) */
  //
  // UserSchema.statics.getJWTSecret = () => {
  //   return jwtSecret;
  // }
  //
  // UserSchema.statics.hasRefreshTokenExpired = (expiresAt: number) => {
  //   let secondsSinceEpoch = Date.now() / 1000;
  //   return expiresAt <= secondsSinceEpoch;
  // }
  //
  // UserSchema.statics.findByIdAndToken = function(_id: string, token: string | undefined) {
  //   return this.findOne({
  //     _id,
  //     'sessions.token': token
  //   })
  // }

}
