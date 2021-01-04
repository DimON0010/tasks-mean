import { Injectable } from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError, empty, Subject} from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  refreshingAccessToken: boolean;
  refreshedAccessToken: Subject<any> = new Subject();

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // handle the request
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        if(error.status === 401) {

        return this.refreshAccessToken().pipe(
            switchMap(() => {
              request = this.addAuthHeader(request);
              return next.handle(request);
            }),
            catchError((err: any) => {
              console.log(err);
              this.authService.logout();
              return empty();
            })
          )
        }
        return throwError(error);
      })
    )
  }

  refreshAccessToken() {
    if(this.refreshingAccessToken) {
      return new Observable(observer => {
        this.refreshedAccessToken.subscribe(() => {
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccessToken = false;
          console.log('Access token refreshed!')
          this.refreshedAccessToken.next();
        })
      )
    }
  }

  addAuthHeader(request: HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken()

    if(token) {
      // append the access token to the request header
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
