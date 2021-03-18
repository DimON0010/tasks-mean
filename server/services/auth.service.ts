import bcrypt from 'bcryptjs';
import { User } from '../models';
import { IUser } from '../models/user.model';
import { encode, TAlgorithm, decode } from 'jwt-simple';
import { PartialSession, EncodeResult, Session, DecodeResult, ExpirationStatus } from '../models/jwt.model';


 export class AuthService {
     constructor() { }

     static passwordComparison(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
      }

     static hashPassword(password: string): string {
        let generSalt: string;
        let result: string;

        bcrypt.genSalt(10, function(err, salt) {
          //if(err) throw new Error(err);
          generSalt = salt;
        });


        result = bcrypt.hashSync(password, generSalt);

        return result;
      }

     static async userLogin(email: string, password: string): Promise<IUser> {
      let user: IUser = null;

      try {
        user = await User.findOne({email});
      } catch(e) {
        console.log(e);
      }

      if(!user) return null;

      if(this.passwordComparison(password, user.password)) {
        return user;
      } else {
        return null
      }

     }

     static createJWT(secretKey: string, partialSession: PartialSession): EncodeResult {
      // Always use HS512 to sign the token
      const algorithm: TAlgorithm = "HS512";
      // Determine when the token should expire
      const issued = Date.now();
      const fifteenMinutesInMs = 15 * 60 * 1000;
      const expires = issued + fifteenMinutesInMs;
      const session: Session = {
          ...partialSession,
          issued: issued,
          expires: expires
      };

      return {
          token: encode(session, secretKey, algorithm),
          issued: issued,
          expires: expires
      };
  }

    static decodeSession(secretKey: string, tokenString: string): DecodeResult {
      // Always use HS512 to decode the token
      const algorithm: TAlgorithm = "HS512";

      let result: Session;

      try {
          result = decode(
            tokenString,
            //sessionToken,
            secretKey, false, algorithm);
      } catch (_e) {
          const e: Error = _e;

          // These error strings can be found here:
          // https://github.com/hokaccha/node-jwt-simple/blob/c58bfe5e5bb049015fcd55be5fc1b2d5c652dbcd/lib/jwt.js
          if (e.message === "No token supplied" || e.message === "Not enough or too many segments") {
              return {
                  type: "invalid-token"
              };
          }

          if (e.message === "Signature verification failed" || e.message === "Algorithm not supported") {
              return {
                  type: "integrity-error"
              };
          }

          // Handle json parse errors, thrown when the payload is nonsense
          if (e.message.indexOf("Unexpected token") === 0) {
              return {
                  type: "invalid-token"
              };
          }

          throw e;
      }

      return {
          type: "valid",
          session: result
      }
    }

  static checkExpirationStatus(token: Session): ExpirationStatus {
    const now = Date.now();

    if (token.expires > now) return "active";

    //Find the timestamp for the end of the token's grace period
    const threeHoursInMs = 3 * 60 * 60 * 1000;
    const threeHoursAfterExpiration = token.expires + threeHoursInMs;
    if (threeHoursAfterExpiration > now) return "grace";

    return "expired"
  }

}
//
//     public async login(req: Request, res: Response): Promise<any> {
//         let {email, password} = req.body;
//
//         User.findByCredentials(email, password).then((user: typeof User) => {
//             return user.createSession().then((refreshToken: string) => {
//                 return user.generateAccessAuthToken().then((accessToken: string) => {
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

//}
