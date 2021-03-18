import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError, empty, Subject } from "rxjs";
import {catchError, switchMap, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";
import { LocalStorageService } from "./local-storage.service";


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let modifiedReq: HttpRequest<any> = req;

    if(!LocalStorageService.getAccessToken()) {
      return next.handle(modifiedReq);
    }

    const userToken = LocalStorageService.getAccessToken().token;
    if (userToken) {
      modifiedReq = req.clone({
        headers: req.headers.set('X-JWT-Token', userToken),
      });
    }

    return next.handle(modifiedReq);
  }

}
