import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { IList } from "../../models/list.model";
import { ITask } from "../../models/task.model";
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})

export class TaskViewComponent implements OnInit {

  lists: IList[];
  tasks: ITask[];

  selectedListId: string;

  constructor(private taskService: TaskService,
              private authService: AuthService,
              // private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // this.authService.currentUser().subscribe((data) => {
    //   console.log(data);
    // })

    // this.route.params.subscribe((params: Params) => {
    //   if(params.listId) {
    //     this.selectedListId = params.listId;
    //     this.taskService.getTasks(params.listId).subscribe((tasks: ITask[]) => {
    //       this.tasks = tasks
    //     })
    //   } else {
    //     this.tasks = undefined;
    //   }
    // })

    // this.taskService.getLists().subscribe((lists: IList[]) => {
    //   this.lists = lists;
    // })
  }

  onTaskClick(task: ITask) {
    this.taskService.complete(task).subscribe(() => {
      task.completed = !task.completed
    })
  }

  deleteListHandler() {
    this.taskService.deleteList(this.selectedListId).subscribe(() => {
      this.router.navigate(['lists'])
    })
  }

  taskDeleteHandler(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(v => v._id !== id);
    })
  }
}
