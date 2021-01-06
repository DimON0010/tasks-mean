import { CrudController } from "./crud.controller";
import { User } from "./../models/user.model";

export class UserController extends CrudController<typeof User> {
 constructor() {
   super(User);
 }

//   public async create(data): Promise<typeof User> {
//    returm data;
//   }
//   public async login() {
//
//   }
//   public async registration = () {
//
// }

}
