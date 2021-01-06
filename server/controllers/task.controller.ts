import { CrudController } from "./crud.controller";
import { Task } from "./../models/task.model";

export class TaskController extends CrudController<typeof Task> {

}
