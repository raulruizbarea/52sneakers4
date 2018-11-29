import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/security/auth.service';
import { AuthInfo } from 'src/app/shared/security/auth-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  submitted = false;

  user: User;

  email: string;
  password: string;
  signIn: string;
  createAccount: string;
  forgetPassword: string;

  constructor(private fb: FormBuilder, private authService: AuthService,
    private router: Router, public alertController: AlertController) {
    this.email = Constants.Email;
    this.password = Constants.Password;
    this.signIn = Constants.SignIn;
    this.createAccount = Constants.CreateAccount;
    this.forgetPassword = Constants.ForgetPassword;

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ngOnInit() {
    console.log('ngOnInit LoginPage');
  }

  login() {
    if (this.form.valid) {
      const formValue = this.form.value;
      this.authService.login(formValue.email, formValue.password)
          .subscribe(
              () => {
                this.router.navigate(['/main']);
              },
              err => {
                console.log(`Error finding user ${err}`);
                this.presentAlert();
                this.form.controls['password'].reset();
              }
          );
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty({ onlySelf: true });
      });
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
