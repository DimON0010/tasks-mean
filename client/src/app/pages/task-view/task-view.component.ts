import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { IList } from "../../models/list.model";
import { ITask } from "../../models/task.model";
import { AuthService } from 'src/app/services/auth.service';
import { AxiosResponse } from 'axios';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})

export class TaskViewComponent implements OnInit {

  lists: IList[] = null;
  tasks: ITask[] = null;

  selectedListId: string = null;

  constructor(private taskService: TaskService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    const listId = this.route.snapshot.paramMap.get('listId');
    if (listId && this.selectedListId !== listId) {
      this.selectedListId = listId;
      this.taskService.getLists().then(response => {
        this.lists = response?.data;
      });
      this.onListClick(listId);
    } else {
      this.taskService.getLists().then(response => {
        this.lists = response?.data;
      });
    }
  }

  async onListClick(listId: string): Promise<void> {
    await this.taskService.getTasks(listId).then(response => {
      if (response?.data?.list?.tasks) { this.tasks = response?.data?.list?.tasks; }
      this.router.navigate(['lists/', listId]);
    });
  }

  taskUpdateHandler(taskId: string) {
    this.router.navigate(['edit-task/', taskId]);
  }

  listUpdateHandler() {
    this.router.navigate(['edit-list/', this.selectedListId]);
  }

  async onTaskClick(task: ITask) {
    await this.taskService.complete(task).then(response => { if (response?.status === 200) {
      task.completed = !task.completed;
    }});
  }

  async deleteListHandler() {
    await this.taskService.deleteList(this.selectedListId).then(data => {
      if (data?.status === 200) {
        this.router.navigate(['lists']);
      }
    });
  }

  async taskDeleteHandler(id: string) {
    await this.taskService.deleteTask(this.selectedListId, id).then(data => {
      if (data?.status === 200) {
        this.tasks = this.tasks.filter(v => v._id !== id);
      }
    });
  }
}
