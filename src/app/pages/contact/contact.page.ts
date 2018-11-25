import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
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

    } else {

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
}
