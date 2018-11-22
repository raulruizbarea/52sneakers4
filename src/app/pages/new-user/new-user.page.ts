import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { UsersService } from 'src/app/shared/model/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {
  form: FormGroup;

  password: string;
  passwordRepeat: string;
  name: string;
  surnames: string;
  email: string;
  createAccount: string;

  constructor(private fb: FormBuilder, private usersService: UsersService) {
    this.password = Constants.Password;
    this.passwordRepeat = Constants.PasswordRepeat;
    this.name = Constants.Name;
    this.surnames = Constants.Surnames;
    this.email = Constants.Email;
    this.createAccount = Constants.CreateAccount;

    this.form = this.fb.group({
        name:  ['', Validators.required],
        surnames:  ['', Validators.required],
        email:  ['', Validators.required],
        password: ['', Validators.required]
    });
   }

  ngOnInit() {
    console.log('ngOnInit NewUserPage');
  }

  save(form) {
    this.usersService.createNewUser(form.value)
        .subscribe(
            () => {
                console.log('User created succesfully.');
            },
            err => alert(`Error creating user ${err}`)
        );
  }
}
