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
        console.error(e);
      }

      if(!user) return null;

      if(this.passwordComparison(password, user.password)) {
        return user;
      } else {
        return null
      }

     }

     static createJWT(secretKey: string, partialSession: PartialSession): EncodeResult {

      const algorithm: TAlgorithm = "HS512";
      // Determine when the token should expire
      const issued = Date.now();
      const oneHourInMs = 60 * 60 * 1000;
      const expires = issued + oneHourInMs;
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

      const algorithm: TAlgorithm = "HS512";

      let result: Session;

      try {
          result = decode(
            tokenString,
            secretKey, false, algorithm);
      } catch (_e) {
          const e: Error = _e;

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
