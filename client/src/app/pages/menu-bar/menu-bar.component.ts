import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})

export class MenuBarComponent implements OnInit {
  items: MenuItem[];
  private _userName: string = null;

  constructor(private authService: AuthService) {}

  public get userName(): string {
    return this._userName;
  }

  public set userName(name: string) {
    this._userName = name;
  }

  async ngOnInit(): Promise<void> {
    const userData = await this.authService.currentUser();
    if (!!userData && userData.data) {
      this.userName = userData.data.data;
    }

    this.items = [
      {
        label: this.userName,
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Log out',
            icon: 'pi pi-fw pi-user-minus',
            command: () => { this.authService.logout(); },
          }
        ]
      }
    ];
  }
}
