import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { WebRequestService } from "./web-request.service";
import { shareReplay, tap } from "rxjs/operators";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from './models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private router: Router,
    private webService: WebRequestService,
    private http: HttpClient) { }

  private  isLoggedIn: boolean = false;

  getIsLoggedIn(): boolean {
    return this.isLoggedIn;
  }

  setIsLoggedIn(isLogged: boolean): void {
    this.isLoggedIn = isLogged;
  }

  currentUser() {
    return this.webService.currentUser()
  }

  login(email: string, password: string) {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'))
      })
    )
  }

  signup(user: IUser) {
    return this.webService.signup(user).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // this.setSession(res.body._id, res.headers.get('x-access-token'), res.headers.get('x-refresh-token'))
      })
    )
  }


  logout() {
    // this.removeSession();
    this.setIsLoggedIn(false);
    LocalStorageService.removeSession();
    this.router.navigate(['/login']);
  }

}
