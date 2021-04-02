import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../models/user.model";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signupHandler(user: IUser) {
    return this.authService.signup(user)
    // .subscribe((res: HttpResponse<any>) => {
      // console.log(res.body);
    // })
  }

}
