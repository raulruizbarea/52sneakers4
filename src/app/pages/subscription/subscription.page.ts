import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {
  modalTitle: string;
  form: FormGroup;
  sampleEmail: string;
  subscription: string;

  constructor(private fb: FormBuilder) {
    this.modalTitle = Constants.Subscription;
    this.sampleEmail = Constants.SampleEmail;
    this.subscription = Constants.SubscribeUnsubscribe;

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
     });
   }

   ngOnInit() {
    console.log('ngOnInit SubscriptionPage');
  }

  save(form) {
    if (this.form.valid) {

    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsDirty({ onlySelf: true });
      });
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
