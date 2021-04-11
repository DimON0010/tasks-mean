import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { ITask } from './../models/task.model';
import { AxiosResponse } from 'axios';
import { IList, IListWithTasks } from '../models/list.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webRequestService: WebRequestService) { }

  async getList(listId: string): Promise<AxiosResponse<IList>> {
    return this.webRequestService.get(`api/lists/${listId}`);
  }

  async getLists(): Promise<AxiosResponse<IList[]>> {
    return this.webRequestService.get('api/lists');
  }

  async createList(title: string): Promise<AxiosResponse<IList>> {
    return this.webRequestService.post('api/lists', { title });
  }

  async updateList(id: string, title: string): Promise<AxiosResponse<IList>> {
    return this.webRequestService.patch(`api/lists/${id}`, { title });
  }

  async deleteList(id: string): Promise<AxiosResponse<IList>> {
    return this.webRequestService.delete(`api/lists/${id}`);
  }

  async getTask(taskId: string): Promise<AxiosResponse<ITask>> {
    return this.webRequestService.get(`api/tasks/${taskId}`);
  }

  async getTasks(listId: string): Promise<AxiosResponse<IListWithTasks>> {
    return this.webRequestService.get(`api/lists/${listId}`, { withTasks: 'true'});
  }
  async createTask(title: string, listId: string): Promise<AxiosResponse<ITask>> {
    return this.webRequestService.post<ITask>(`api/tasks`, { title, _listId: listId, completed: false });
  }
  async deleteTask(listId: string, taskId: string): Promise<AxiosResponse<ITask>> {
    return this.webRequestService.delete<ITask>(`api/tasks/${taskId}`);
  }
  async updateTask(taskId: string, title: string): Promise<AxiosResponse<ITask>> {
    return this.webRequestService.patch<ITask>(`api/tasks/${taskId}`, { title });
  }

  complete(task: ITask): Promise<AxiosResponse<ITask>> {
    return this.webRequestService.patch<ITask>(`api/tasks/${task._id}`, {
      completed: !task.completed
    });
  }
}
