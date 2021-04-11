import { ITask } from './task.model';

export interface IList {
  _id?: string;
  title: string;
}

export interface IListWithTasks {
  list: {
    list: IList;
    tasks: ITask[]
  };
}
