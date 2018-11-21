import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string;
  password: string;
  signIn: string;
  createAccount: string;
  forgetPassword: string;

  constructor() {
    this.username = Constants.Username;
    this.password = Constants.Password;
    this.signIn = Constants.SignIn;
    this.createAccount = Constants.CreateAccount;
    this.forgetPassword = Constants.ForgetPassword;
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
  }
}
