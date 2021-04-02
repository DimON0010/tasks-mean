import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { IRes } from '../../models/response.model';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})

export class MenuBarComponent {

  constructor(private authService: AuthService) {

  }

  items: MenuItem[];

  private _userName: string = null;

  public get userName(): string {
    return this._userName;
  }

  public set userName(name: string) {
    this._userName = name;
  }

  // getUserName(): string {
  //   return this.userName;
  // }

  // setUserName(uName: string): void {
  //   this.userName = uName;
  // }

  ngOnInit() {
    this.authService.currentUser();
    // .subscribe((data: IRes) => {
    //   this.userName = data.data;

    //   this.items = [
    //     {
    //       label: this.userName,
    //       icon: 'pi pi-fw pi-user',
    //       items: [
    //         {
    //           label: 'Log out',
    //           icon: 'pi pi-fw pi-user-minus',
    //           command: () => {this.authService.logout()},
    //         }
    //       ]
    //     }
    //   ];
    // })
  }
}
