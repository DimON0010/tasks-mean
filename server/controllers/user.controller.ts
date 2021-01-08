import { CrudController } from "./crud.controller";
import { User, IUser } from "./../models/user.model";


export class UserController extends CrudController<IUser, typeof User> {
  constructor() {
    super(User);
  }
}
