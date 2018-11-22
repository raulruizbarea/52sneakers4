import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsersService } from 'src/app/shared/model/users.service';
import { User } from 'src/app/shared/model/user';
import { tap } from 'rxjs/operators';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  submitted = false;

  // allUsers: User[];
  user: User;

  email: string;
  password: string;
  signIn: string;
  createAccount: string;
  forgetPassword: string;

  constructor(private fb: FormBuilder, private usersService: UsersService,
    private router: Router, public alertController: AlertController) {
    this.email = Constants.Email;
    this.password = Constants.Password;
    this.signIn = Constants.SignIn;
    this.createAccount = Constants.CreateAccount;
    this.forgetPassword = Constants.ForgetPassword;

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
  }

  /*
  findUsers() {
    this.usersService.findAllUsers().pipe(
      tap(console.log))
      .subscribe(
          users => this.allUsers = users
      );
  }
  */

  login() {
    if (this.form.valid) {
      const formValue = this.form.value;

      this.usersService.findUserByEmail(formValue.email).pipe(
        tap(console.log))
        .subscribe(
          user => {
            this.user = user;
            if (this.user !== undefined) {
              this.checkUser(this.user);
            } else {
              this.presentAlert();
              this.form.controls['password'].reset();
            }
          },
          err => alert(`Error finding user ${err}`));
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  checkUser(user: User) {
    console.log(user);
    const formValue = this.form.value;
    if (user.password === Md5.hashStr(formValue.password)) {
      this.router.navigateByUrl('/main');
    } else {
      this.presentAlert();
      this.form.controls['password'].reset();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Usuari o password invalid.',
      buttons: ['OK']
    });

    await alert.present();
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
            && this.form.controls[field].errors &&
            this.form.controls[field].errors[error];
  }
}
