import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId: string;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      this.taskId = params.taskId;
    })
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.taskId, title).subscribe(() => {
      this.router.navigate(['lists'])
    })
  }

}
