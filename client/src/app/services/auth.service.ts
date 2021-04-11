import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IUser } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(
    private router: Router,
    private webService: WebRequestService,
    private http: HttpClient,
  ) { }

  currentUser(): Promise<any> {
    return this.webService.currentUser();
  }

  login(email: string, password: string): Promise<any> {
    return this.webService.login(email, password);
  }

  signup(user: IUser): Promise<any> {
    return this.webService.signup(user);
  }

  logout(): void {
    LocalStorageService.removeSession();
    this.router.navigate(['/login']);
  }
}
