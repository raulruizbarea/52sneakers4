import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/shared/model/email.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  modalTitle: string;
  send: string;
  form: FormGroup;
  name: string;
  email: string;
  comments: string;

  constructor(private modalCtrl: ModalController,
    private fb: FormBuilder, private emailService: EmailService) {
    this.send = Constants.Send;
    this.modalTitle = Constants.Contact;
    this.name = Constants.CompleteName;
    this.email = Constants.Email;
    this.comments = Constants.Comments;

    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      text: ['', Validators.compose([Validators.required])],
     });
  }

  ngOnInit() {
    console.log('ngOnInit ContactPage');
  }

  save(form) {
    if (this.form.valid) {
      this.sendMessage();
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty({ onlySelf: true });
      });
    }
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }

  isErrorVisible(field: string, error: string) {
    if (!this.form.controls[field]) {
      return false;
    }
    return this.form.controls[field].dirty
            && this.form.controls[field].errors &&
            this.form.controls[field].errors[error];
  }

  sendMessage() {
    const to = 'raul.ruiz.barea@gmail.com';
    const subject = Constants.AppName + ' - ' + this.form.controls['name'].value + ' - ' + this.form.controls['email'].value;
    const message = this.form.controls['text'].value;

    this.emailService.sendEmail(to, undefined, undefined, undefined, subject, message);
  }
}
