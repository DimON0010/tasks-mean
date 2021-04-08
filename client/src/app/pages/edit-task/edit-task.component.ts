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
  currentTaskId: string;
  taskTitle: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
    const taskId = this.route.snapshot.paramMap.get('taskId');
    if (taskId) {
      this.currentTaskId = taskId;
      this.taskService.getTask(taskId).then(data => this.taskTitle = data.data.title);
    }
  }

  updateTask(title: string): void {
    this.taskService.updateTask(this.currentTaskId, title).then(data => {
      if (data?.status === 200) {
        this.router.navigate(['../']);
        // this.router.navigate(['lists']);
      }
    });
  }

}
