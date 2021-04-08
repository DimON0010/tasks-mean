import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { HttpClient, HttpParams } from "@angular/common/http";
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

  async get(uri: string, queryParams?: { [key: string]: string }): Promise<any> {
    try {
      let result: any;
      if (queryParams) {
        result = await this.axiosInstance.get(`${this.ROOT_URL}/${uri}`, {
          params: queryParams
        });
      } else {
        result = await this.axiosInstance.get(`${this.ROOT_URL}/${uri}`);
      }
      return result;
    } catch (e) {
      console.error(e);
    }

  }

  // TODO: add generic type
  async post(uri: string, payload: object): Promise<any> {
    try {
      let result;
      return await this.axiosInstance.post(`${this.ROOT_URL}/${uri}`, payload).
        then(data => result = data).
        catch(error => console.error(error));
    } catch (error) {
      console.error('fuckingPostError: ', error);
      return null;
    }
  }

  async patch(uri: string, payload: object) {
    try {
      return await this.axiosInstance.patch(`${this.ROOT_URL}/${uri}`, payload);
    } catch (e) {
      console.error(e);
    }
  }

  async delete(uri: string) {
    try {
      return await this.axiosInstance.delete(`${this.ROOT_URL}/${uri}`);
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

  async signup(user: IUser) {
    try {
      return await this.axiosInstance.post(`${this.ROOT_URL}/api/users`, {
        ...user
      });
    } catch (e) {
      console.error(e);
      return e;
    }
  }

  async currentUser() {
    try {
      return await this.axiosInstance.get(`${this.ROOT_URL}/api/users/current`);
    } catch (e) {
      console.error(e);
    }
  }
}
