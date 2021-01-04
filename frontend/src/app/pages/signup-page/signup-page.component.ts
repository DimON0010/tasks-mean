import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../auth.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signupHandler(email: string, password: string) {
    return this.authService.signup(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);
    })
  }

}
