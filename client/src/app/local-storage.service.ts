import { Injectable } from '@angular/core';
import { IToken } from './models/token.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // getUserId() {
  //   return localStorage.getItem('user-id');
  // }

  static getAccessToken(): IToken {
    return JSON.parse(localStorage.getItem('X-JWT-Token'));
  }

  static setAccessToken(accessToken: IToken): void {
    localStorage.setItem('X-JWT-Token', JSON.stringify(accessToken));
  }


  // getRefreshToken() {
  //   return localStorage.getItem('x-refresh-token');
  // }

  // setRefreshToken(refreshToken: string) {
  //   localStorage.setItem('x-refresh-token', refreshToken);
  // }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }
  static removeSession() {
    localStorage.removeItem('X-JWT-Token');
  }

  // getNewAccessToken() {
  //   return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
  //     headers: {
  //       'x-refresh-token': this.getRefreshToken(),
  //       '_id': this.getUserId()
  //     },
  //     observe: 'response'
  //   }).pipe(
  //     tap((res: HttpResponse<any>) => {
  //       this.setAccessToken(res.headers.get('x-access-token'))
  //     })
  //   )
  // }

}
