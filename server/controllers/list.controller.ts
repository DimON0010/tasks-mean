import { CrudController } from "./crud.controller";
import { IList, List } from "./../models";


export class ListController extends CrudController<IList, typeof List> {
  constructor() {
    super(List);
  }
}
