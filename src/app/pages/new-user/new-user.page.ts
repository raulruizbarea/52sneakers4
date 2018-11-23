import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { UsersService } from 'src/app/shared/model/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Md5} from 'ts-md5/dist/md5';
import { AuthService } from 'src/app/shared/security/auth.service';
import { Router } from '@angular/router';

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

  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService,
              private usersService: UsersService) {
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
        password: ['', Validators.required],
        confirm: ['', Validators.required]
    });
   }

  ngOnInit() {
    console.log('ngOnInit NewUserPage');
  }

  save(form) {
    this.form.value.password = Md5.hashStr(this.form.value.password);

    this.authService.signUp(this.form.value.email, this.form.value.password)
            .subscribe(
                () => {
                    console.log('Firebase: User created successfully.');
                    this.usersService.createNewUser(form.value)
                            .subscribe(
                                () => {
                                    console.log('User created succesfully.');
                                    this.router.navigateByUrl('/main');
                                },
                                err => console.log(`Error creating user ${err}`)
                            );
                },
                err => console.log(`Firebase: Error creating user ${err}`)
            );
  }

  isPasswordMatch() {
    const val = this.form.value;
    return val && val.password && val.password === val.confirm;
  }
}
