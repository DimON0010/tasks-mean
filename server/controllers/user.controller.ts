import { CrudController } from "./crud.controller";
import { User, IUser } from "./../models/user.model";
import { AuthService } from "../services/auth.service";
import { EncodeResult } from "../models/jwt.model";


export class UserController extends CrudController<IUser, typeof User> {
  constructor() {
    super(User);
  }

  public async signUp(user: IUser): Promise<EncodeResult> {
    const createdUser = await this.create(user);

    const session = AuthService.createJWT(process.env.JWT_SECRET, {
      id: createdUser._id,
      userName: createdUser.firstName + ' ' + createdUser.lastName,
      dateCreated: new Date().toLocaleString("en-US", { timeZone: "UTC" })
    });

    return session;
  }
}
