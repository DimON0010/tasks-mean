import { CrudController } from "./crud.controller";
import { Task, ITask } from "./../models/task.model";


export class TaskController extends CrudController<ITask, typeof Task> {
  constructor() {
    super(Task);
  }
}
