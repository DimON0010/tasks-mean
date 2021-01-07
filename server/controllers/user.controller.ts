import { CrudController } from "./crud.controller";
import { User } from "./../models/user.model";


export class UserController extends CrudController<typeof User> {
 constructor() {
   super(User);
 }
}
