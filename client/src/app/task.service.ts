import { Injectable } from '@angular/core';
import { WebRequestService } from "./web-request.service";
import { ITask } from './models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  getLists() {
    return this.webRequestService.get('api/lists');
  }
  createList(title: string) {
    return this.webRequestService.post('api/lists', { title });
  }
  updateList(id: string, title: string) {
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  deleteList(id: string) {
    return this.webRequestService.delete(`lists/${id}`);
  }

  getTasks(listId: string) {
    return this.webRequestService.get(`api/lists/${listId}`, 'withTasks=true');
  }
  createTask(title: string, listId: string) {
    return this.webRequestService.post(`api/tasks`, { title: title, _listId: listId, completed: false });
  }
  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`api/tasks/${taskId}`);
  }
  updateTask(taskId: string, title: string) {
    return this.webRequestService.patch(`tasks/${taskId}`, { title });
  }

  complete(task: ITask) {
    return this.webRequestService.patch(`api/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
