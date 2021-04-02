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

  async ngOnInit(): Promise<void> {

    await this.taskService.getLists().then(response => {
      this.lists = response.data; });

    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.selectedListId = params.listId;
        if ( !this.selectedListId || this.selectedListId !== params.listId) {
          this.onListClick(params.listId);
        }
      }
    });
  }

  async onListClick(listId: string): Promise<void> {
      await this.taskService.getTasks(listId).then(response => {
        console.log('getTasks() response: ', response.data);
        if (response.data?.tasks) { console.log(response.data?.tasks); }
        this.router.navigate(['lists/', listId]);
      });
    // .subscribe((data: {list: IList, tasks: ITask[]}) => {
    //  this.tasks = data.tasks;
    //
    // });
  }

  taskUpdateHandler(taskId: string) {
    this.router.navigate(['edit-task/', taskId]);
  }

  listUpdateHandler() {
    this.router.navigate(['edit-list/', this.selectedListId]);
  }

  onTaskClick(task: ITask) {
    this.taskService.complete(task)
    // .subscribe(() => {
      // task.completed = !task.completed
    // });
  }

  deleteListHandler() {
    this.taskService.deleteList(this.selectedListId)
    // .subscribe(() => {
      // this.router.navigate(['lists']);
    // })
  }

  taskDeleteHandler(id: string) {
    this.taskService.deleteTask(this.selectedListId, id)
    // .subscribe((res: any) => {
      // this.tasks = this.tasks.filter(v => v._id !== id);
    // })
  }
}
