import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { IUser } from './../models/user.model';
import { IToken } from '../models/token.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;
  private axiosInstance = axios.create();

  constructor() {
    this.ROOT_URL = 'http://localhost:3000';
    this.axiosInstance.interceptors.request.use(
      successfulReq => {
        const userToken = LocalStorageService.getAccessToken();
        if (!!userToken && userToken.token) {
          successfulReq.headers['X-JWT-Token'] = userToken.token;
        }
        return successfulReq;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  async get<T>(uri: string, queryParams?: { [key: string]: string }): Promise<AxiosResponse<T>> {
    try {
      let result: AxiosResponse<T>;
      if (queryParams) {
        result = await this.axiosInstance.get<T>(`${this.ROOT_URL}/${uri}`, {
          params: queryParams
        });
      } else {
        result = await this.axiosInstance.get<T>(`${this.ROOT_URL}/${uri}`);
      }
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  // TODO: add generic type
  async post<T>(uri: string, payload: T): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.post<T>(`${this.ROOT_URL}/${uri}`, payload);
    } catch (error) {
      console.error('WebRequestService.post error: ', error);
      return null;
    }
  }

  async patch<T>(uri: string, payload: T): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.patch<T>(`${this.ROOT_URL}/${uri}`, payload);
    } catch (e) {
      console.error(e);
    }
  }

  async delete<T>(uri: string): Promise<AxiosResponse<T>> {
    try {
      return await this.axiosInstance.delete<T>(`${this.ROOT_URL}/${uri}`);
    } catch (e) {
      console.error(e);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const result = await this.axiosInstance.post(`${this.ROOT_URL}/api/users/login`, {
        email,
        password
      });
      return result;
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async signup(user: IUser): Promise<any> {
    try {
      return await this.axiosInstance.post(`${this.ROOT_URL}/api/users`, {
        ...user
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async currentUser(): Promise<AxiosResponse<IUser>> {
    try {
      return await this.axiosInstance.get<IUser>(`${this.ROOT_URL}/api/users/current`);
    } catch (e) {
      console.error(e);
    }
  }
}
