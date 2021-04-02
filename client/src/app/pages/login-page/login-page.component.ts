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

  error: string = null;

  constructor(private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async loginHandler(email: string, password: string) {
    const response = await this.authService.login(email, password);

    if (response?.status === 200 && response?.data?.token) {
      LocalStorageService.setAccessToken(response.data);
      this.authService.isLoggedIn = true;
      this.router.navigate(['/lists']);
    } else {
      console.log('loginHandle error');

      // if (response?.data?.message) {
      //   this.error = res.body.message;
      // }
    }
  }
}
