import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { AxiosResponse } from 'axios';
import { IToken } from 'src/app/models/token.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  inputError: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async loginHandler(email: string, password: string): Promise<void> {
    if (!this.validate(email, password)) {
      return;
    }
    const response = await this.authService.login(email, password);

    if (response?.status === 200 && response.data?.token) {
      this.inputError = null;

      LocalStorageService.setAccessToken(response.data);
      this.router.navigate(['/lists']);
    } else {
      console.error('loginHandle error');
      this.inputError = response && response.message;
    }
  }

  private validate(email: string, password: string): boolean {
    let result = false;
    const validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    switch (true) {
      case email.trim().length === 0:
        this.inputError = 'Email is empty';
        break;
      case !validEmail.test(email):
        this.inputError = 'Email is not valid';
        break;
      case password.trim().length === 0:
        this.inputError = 'Password is empty';
        break;
      case password.length < 8:
        this.inputError = 'Password is too short. Should be at least 8 symbols.';
        break;
      default:
        result = true;
        this.inputError = null;
        break;
    }
    return result;
  }
}
