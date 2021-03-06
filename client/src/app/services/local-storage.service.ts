import { Injectable } from '@angular/core';
import { IToken } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  static getAccessToken(): IToken {
    return JSON.parse(localStorage.getItem('X-JWT-Token'));
  }

  static setAccessToken(accessToken: IToken): void {
    localStorage.setItem('X-JWT-Token', JSON.stringify(accessToken));
  }

  static removeSession(): void {
    localStorage.removeItem('X-JWT-Token');
  }

  private setSession(userId: string, accessToken: string, refreshToken: string): void {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }
}
