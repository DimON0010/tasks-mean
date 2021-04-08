import { Component, OnInit } from '@angular/core';
import { TaskService } from "../../services/task.service";
import { Router } from '@angular/router';
import { IList } from "../../models/list.model";

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {
  inputError: string = null;

  constructor(
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createList(title: string): void {
    if (title.trim().length === 0) {
      this.inputError = title.length !== 0 ? 'List title is empty' : 'List title is required';
      return;
    } else if (title.length > 64) {
      this.inputError = 'List is too long. Max length is 64 symbols';
      return;
    } else {
      this.inputError = null;
    }

    this.taskService.createList(title).then(data => {
      if (data?.status === 200) {
        this.router.navigate(['lists']);
      }
    });

  }
}
