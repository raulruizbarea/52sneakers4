import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  modalTitle: string;

  constructor(private modalCtrl: ModalController) {
    this.modalTitle = Constants.Notifications;
   }

  ngOnInit() {
    console.log('ngOnInit NotificationPage');
  }

  doCancel() {
    this.modalCtrl.dismiss();
  }
}
