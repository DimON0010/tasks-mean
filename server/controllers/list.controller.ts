import { CrudController } from "./crud.controller";
import { List } from "./../models";


export class ListController extends CrudController<typeof List> {
  constructor() {
    super(List);
  }
}
