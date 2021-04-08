import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ITask } from '../../models/task.model';
import { AxiosResponse } from 'axios';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  listId: string;
  inputError: string = null;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const urlListId = this.route.snapshot.paramMap.get('listId');
    if (urlListId) {
      this.listId = urlListId;
    }
  }

  createTask(title: string): void {
    if (title.trim().length === 0) {
      this.inputError = title.length !== 0 ? 'Task title is empty' : 'Task title is required';
      return;
    } else if (title.length > 64) {
      this.inputError = 'Title is too long. Max length is 64 symbols';
      return;
    } else {
      this.inputError = null;
    }

    this.taskService.createTask(title, this.listId).then((response: AxiosResponse<ITask>) => {

      if (response?.status === 200) {
        this.router.navigate(['../'], { relativeTo: this.route });
      } else {
        console.error('error: creaTeTask');
      }
    });
  }
}
