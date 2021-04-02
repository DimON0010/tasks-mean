import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, empty, Subject } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let modifiedReq: HttpRequest<any> = req;

    if (!LocalStorageService.getAccessToken()) {
      return next.handle(modifiedReq);
    }

    const userToken = LocalStorageService.getAccessToken();
    if (userToken.expires < Date.now()) {
      this.authService.logout();
      // this.router.navigate(['/login']);
      // return next.handle(modifiedReq);
    } else {
      if (userToken.token) {
        modifiedReq = req.clone({
          headers: req.headers.set('X-JWT-Token', userToken.token),
        });
      }}

    return next.handle(modifiedReq);
  }

}
