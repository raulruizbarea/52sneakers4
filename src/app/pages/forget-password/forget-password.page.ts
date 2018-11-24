import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AuthService } from 'src/app/shared/security/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
})
export class ForgetPasswordPage implements OnInit {
  form: FormGroup;
  passwordForget: string;
  passwordReset: string;
  email: string;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder
    , public alertController: AlertController) {
    this.passwordForget = Constants.ForgetPassword;
    this.passwordReset = Constants.PasswordReset;
    this.email = Constants.Email;

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  ngOnInit() {
    console.log('ngOnInit ForgetPasswordPage');
  }

  resetPassword() {
    if (this.form.valid) {
      this.authService.resetPassword(this.form.controls['email'].value)
        .then(() => {
          console.log('Email sent');
          this.presentAlert();
        })
        .catch((error) => {
          console.log(error);
          this.presentAlert();
        });
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Email enviat',
      message: 'Les instruccions per restablir la contrasenya han estat enviades.',
      buttons: [{ text: 'Ok',
        handler: () => {
        console.log('Confirm Ok');
        this.router.navigate(['/login']);
      }}]
    });

    await alert.present();
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
