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

  currentListId: string;
  listTitle: string;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    const listId = this.route.snapshot.paramMap.get('listId');
    if (listId) {
      this.currentListId = listId;
      await this.taskService.getList(listId).then(data => this.listTitle = data.data.title);
    }
  }

  updateList(title: string): void {
    this.taskService.updateList(this.currentListId, this.listTitle).then(data => {
      this.router.navigate(['lists', this.currentListId]);
    });
  }
}
