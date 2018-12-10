import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import {formatDate} from '@angular/common';
import { tap } from 'rxjs/operators';
import { Subscriptions } from 'src/app/shared/model/subscriptions';
import { ToastController, ModalController } from '@ionic/angular';

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
  subs: Subscriptions;
  subscriptionsOffers: string;
  whichEmail: string;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder, private subscriptionsService: SubscriptionsService
    , private toastCtrl: ToastController) {
    this.modalTitle = Constants.Subscription;
    this.sampleEmail = Constants.SampleEmail;
    this.subscription = Constants.SubscribeUnsubscribe;
    this.subscriptionsOffers = Constants.SubscriptionsOffers;
    this.whichEmail = Constants.WhichEmail;

    this.form = this.fb.group({
      date: [''],
      email: ['', Validators.compose([Validators.required, Validators.email])],
     });
   }

   ngOnInit() {
    console.log('ngOnInit SubscriptionPage');
  }

  save(form) {
    if (this.form.valid) {
      this.form.controls['date'].setValue(formatDate(new Date(), 'MM/dd/yyyy', 'en').toString());

      this.subscriptionsService.findSubscriptionByEmail(this.form.controls['email'].value).pipe(
        tap(console.log))
        .subscribe(
          subscription => {
            this.subs = subscription;
            if (this.subs === undefined) {
              this.subscriptionsService.createNewSubscription(this.form.value)
                .subscribe(
                    () => {
                        console.log('Subscription created succesfully.');
                        this.presentToast();
                    },
                    err => {
                      console.log(`Error creating subscription ${err}`);
                    }
                );
            } else {
              this.presentToast();
            }
          },
          err => {
            console.log(`Error finding subscription ${err}`);
          });
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

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: Constants.EmailSent,
      duration: 2000,
      showCloseButton: false,
      // position: 'top',
      // closeButtonText: 'OK'
    });

    toast.onDidDismiss().then(() => {
      this.doCancel();
    });

    toast.present();
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }
}
