import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/security/auth.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

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
        name:  ['', Validators.compose([Validators.required])],
        surnames:  ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
        confirm: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
   }

  ngOnInit() {
    console.log('ngOnInit NewUserPage');
  }

  save(form) {
    if (this.form.valid && this.form.controls['password'].value === this.form.controls['confirm'].value) {

    this.authService.signUp(this.form.value.email, this.form.value.password)
            .subscribe(
                res => {
                    console.log('Firebase: User created successfully.');
                    this.removePasswordAndConfirm();
                    this.usersService.createNewUser(this.authService.authInfo$.value.$uid, this.form.value)
                            .subscribe(
                                () => {
                                    console.log('User created succesfully.');
                                    this.router.navigateByUrl('/main/tabs/(home:home)');
                                },
                                err => {
                                  console.log(`Error creating user ${err}`);
                                  this.addPasswordAndConfirm();
                                }
                            );
                },
                err => {
                  console.log(`Firebase: Error creating user ${err}`);
                  this.addPasswordAndConfirm();
                }
            );
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  addPasswordAndConfirm() {
    this.form.addControl('password', new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])));
    this.form.addControl('confirm', new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])));
  }

  removePasswordAndConfirm() {
    this.form.removeControl('password');
    this.form.removeControl('confirm');
  }

  isPasswordMatch() {
    const val = this.form.value;
    if (val.confirm) {
      return val && val.confirm && val.password && val.password === val.confirm;
    } else {
      return true;
    }
  }

  isErrorVisible(field: string, error: string) {
    if (!this.form.controls[field]) {
      return false;
    }
    return this.form.controls[field].dirty
            && this.form.controls[field].errors &&
            this.form.controls[field].errors[error];
  }
}
