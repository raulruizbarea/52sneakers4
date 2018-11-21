import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  username: string;
  password: string;
  passwordRepeat: string;
  name: string;
  surnames: string;
  email: string;
  createAccount: string;

  user: User = {
    name: '',
    surnames: '',
    email: '',
  };

  constructor() {
    this.username = Constants.Username;
    this.password = Constants.Password;
    this.passwordRepeat = Constants.PasswordRepeat;
    this.name = Constants.Name;
    this.surnames = Constants.Surnames;
    this.email = Constants.Email;
    this.createAccount = Constants.CreateAccount;
   }

  ngOnInit() {
    console.log('ngOnInit NewUserPage');
  }

}
