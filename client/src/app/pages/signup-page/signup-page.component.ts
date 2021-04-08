import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../models/user.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  inputError: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  async signupHandler(user: IUser): Promise<any> {
    if (!this.validate(user)) {
      return;
    }

    const response = await this.authService.signup(user);


    if (response?.status !== 200) {
      this.inputError = response?.message;
    } else {
      this.router.navigate(['/lists']);
    }

    return response;
  }

  private validate(user: IUser): boolean {
    let result = false;
    const validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    switch (true) {
      case user.email.trim().length === 0:
        this.inputError = 'Email is empty';
        break;
      case !validEmail.test(user.email):
        this.inputError = 'Email is not valid';
        break;
      case user.password.trim().length === 0:
        this.inputError = 'Password is empty';
        break;
      case user.password.length < 8:
        this.inputError = 'Password is too short. Should be at least 8 symbols.';
        break;
      case user.firstName.trim().length === 0:
        this.inputError = 'First name is empty';
        break;
      case user.firstName.length > 32:
        this.inputError = 'First name is too long. Should be less that 32 symbols.';
        break;
      case user.lastName.trim().length === 0:
        this.inputError = 'Last name is empty';
        break;
      case user.lastName.trim().length > 32:
        this.inputError = 'Last name is too long. Should be less that 32 symbols.';
        break;
      default:
        result = true;
        this.inputError = null;
        break;
    }
    return result;
  }
}
