import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { HttpClient, HttpParams } from "@angular/common/http";
import { IUser } from './../models/user.model';
import { IToken } from '../models/token.model';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {
  readonly ROOT_URL;
  private axiosInstance = axios.create();

  constructor() {
    this.ROOT_URL = 'http://localhost:3000';
  }

  async get(uri: string, queryParams?: { [key: string]: string }): Promise<any> {
    try {
      let result: any;
      if (queryParams) {
                result = await this.axiosInstance.get(`${this.ROOT_URL}/${uri}`, {
                  params: queryParams
            });
      }
      result = await this.axiosInstance.get(`${this.ROOT_URL}/${uri}`);
      return result;
    } catch (e) {
      console.log(e);
    }

  }

  async post(uri: string, payload: object) {
    try {
      return this.axiosInstance.post(`${this.ROOT_URL}/${uri}`, payload);
    } catch (e) {
      console.log(e);
    }
  }

  async patch(uri: string, payload: object) {
    try {
      return await this.axiosInstance.patch(`${this.ROOT_URL}/${uri}`, payload);
    } catch (e) {
      console.log(e);
    }
  }

  async delete(uri: string) {
    try {
      return await this.axiosInstance.delete(`${this.ROOT_URL}/${uri}`);
    } catch (e) {
      console.log(e);
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.axiosInstance.post(`${this.ROOT_URL}/api/users/login`, {
        email,
        password
      });
      return result;
      // .then(response => response)
      // .catch(error => console.log(error));
    } catch (e) {
      console.log(e);
    }
  }

  async signup(user: IUser) {
    try {
      return await this.axiosInstance.post(`${this.ROOT_URL}/api/users`, {
        ...user
      });
    } catch (e) {
      console.log(e);
    }
  }

  async currentUser() {
    try {
      return await this.axiosInstance.get(`${this.ROOT_URL}/api/users/current`)
    } catch (e) {
      console.log(e);
    }
  }
}
