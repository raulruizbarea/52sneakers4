import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Constants } from 'src/app/constants/app.constants';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  modalTitle: string;
  notificationsQuestion: string;
  form: FormGroup;
  saveNotification: string;
  hasNotifications: boolean;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder,
    private usersService: UsersService, private afAuth: AngularFireAuth, private toastCtrl: ToastController) {
    this.modalTitle = Constants.Notifications;
    this.notificationsQuestion = Constants.NotificationsQuestion;
    this.saveNotification = Constants.Save;
    this.hasNotifications = false;

    this.form = this.fb.group({
      notifications: [''],
     });
   }

  ngOnInit() {
    console.log('ngOnInit NotificationPage');
    this.usersService.findNotificationConfigByUser(this.afAuth.auth.currentUser.uid)
    .subscribe(value => {
      this.hasNotifications = value;
    });
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }

  save(form) {
    // alert(this.form.controls['notifications'].value);
    this.usersService.updateNotificationConfigByUser(this.afAuth.auth.currentUser.uid, this.form.controls['notifications'].value);
    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: Constants.NotificationsChangedSuccess,
      // duration: 2000,
      showCloseButton: true,
      // position: 'top',
      closeButtonText: 'OK'
    });

    toast.onDidDismiss().then(() => {
      this.doCancel();
    });

    toast.present();
  }
}
