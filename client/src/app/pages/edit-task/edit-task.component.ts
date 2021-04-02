import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ITask } from 'src/app/models/task.model';
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId: string;
  taskTitle: string;

  constructor(private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.taskId) {
        this.taskId = params.taskId;
      }

    })
    if (this.taskId) {
      this.taskService.getTask(this.taskId);
      // .subscribe(
      //   (task: ITask) => this.taskTitle = task.title);
    }
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.taskId, title);
    // .subscribe(() => {
      // this.router.navigate(['lists'])
    // })
  }

}
