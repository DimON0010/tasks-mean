import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ITask } from '../../models/task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId: string;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      })
  }

  createTask(title: string) {
    return this.taskService.createTask(title, this.listId)
    // .subscribe((newTask: ITask) => {
      // this.router.navigate(['../'], { relativeTo: this.route })
    // });
  }
}
