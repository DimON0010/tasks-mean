import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { ITask } from './../models/task.model';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  getList(listId: string) {
    return this.webRequestService.get(`api/lists/${listId}`);
  }

  getLists(): Promise<any> {
    return this.webRequestService.get('api/lists');
  }
  createList(title: string) {
    return this.webRequestService.post('api/lists', { title });
  }
  updateList(id: string, title: string) {
    return this.webRequestService.patch(`api/lists/${id}`, { title });
  }

  deleteList(id: string) {
    return this.webRequestService.delete(`api/lists/${id}`);
  }

  getTask(taskId: string) {
    return this.webRequestService.get(`api/tasks/${taskId}`);
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`api/lists/${listId}`, { withTasks: 'true'});
  }
  async createTask(title: string, listId: string): Promise<AxiosResponse<any>> {
    return this.webRequestService.post(`api/tasks`, { title: title, _listId: listId, completed: false });
  }
  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`api/tasks/${taskId}`);
  }
  updateTask(taskId: string, title: string) {
    return this.webRequestService.patch(`api/tasks/${taskId}`, { title });
  }

  complete(task: ITask) {
    return this.webRequestService.patch(`api/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
