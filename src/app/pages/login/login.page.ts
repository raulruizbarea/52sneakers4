import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  @Input()
  initialValue: any;

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
      email: ['', Validators.required],
      password: ['', Validators.required]
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
    const formValue = this.form.value;

    this.usersService.findUserByEmail(formValue.email).pipe(
      tap(console.log))
      .subscribe(
        user => {
          this.user = user;
          this.checkUser(this.user);
        },
        err => alert(`Error finding user ${err}`));
  }

  checkUser(user: User) {
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
      message: 'El password no coincidex.',
      buttons: ['OK']
    });

    await alert.present();
  }

  reset() {
    this.form.reset();
  }
}
