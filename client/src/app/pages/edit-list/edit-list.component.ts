import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { IList } from 'src/app/models/list.model';
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  listId: string;
  listTitle: string;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.listId) {
        this.listId = params.listId;
      }

    });
    if (this.listId) {
      console.log( this.taskService.getList(this.listId));
      // subscribe((list: IList) => this.listTitle = list.title);
    }
  }

  updateList(title: string): void {
    this.taskService.updateList(this.listId, this.listTitle);
    // .subscribe(() => {
    //   this.router.navigate(['lists', this.listId]);
    // });
  }
}
