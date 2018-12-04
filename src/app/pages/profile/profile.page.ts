import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/security/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'src/app/shared/model/user';
import { Constants } from 'src/app/constants/app.constants';
import { ModalController, AlertController } from '@ionic/angular';
import { ContactPage } from '../contact/contact.page';
import { SubscriptionPage } from '../subscription/subscription.page';
import { NotificationPage } from '../notification/notification.page';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  task: AngularFireUploadTask;
  progress: any;
  image: string;

  user: User;
  completeName: string;
  favourites: string;
  disconnect: string;
  subscription: string;
  contact: string;
  history: string;
  notification: string;

  constructor(private authService: AuthService, private usersService: UsersService,
    private afAuth: AngularFireAuth, private modalCtrl: ModalController,
    private storage: AngularFireStorage, private camera: Camera, private alertController: AlertController) {
    this.favourites = Constants.Favourites;
    this.disconnect = Constants.Disconnect;
    this.subscription = Constants.Subscription;
    this.contact = Constants.Contact;
    this.history = Constants.History;
    this.notification = Constants.Notifications;
   }

  ngOnInit() {
    this.usersService.findUserById(this.afAuth.auth.currentUser.uid)
      .subscribe(
        value => {
          // console.log(value);
          this.user = value;
          this.completeName = this.user.name + ' ' + this.user.surnames;
        },
        err => console.log(`Error finding user ${err}`));
  }

  logout() {
    this.authService.logout();
  }

  navigateToContact() {
    this.openModal(ContactPage);
  }

  navigateToSubscription() {
    this.openModal(SubscriptionPage);
  }

  navigateToNotification() {
    this.openModal(NotificationPage);
  }

  async openModal(comp) {
    const modal = await this.modalCtrl.create({
     component: comp,
   });

   return await modal.present();
  }

  async captureImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    return await this.camera.getPicture(options);
  }

  createUploadTask(file: string): void {
    const filePath = '/52sneakers/users/' + this.afAuth.auth.currentUser.uid  + '/profile_photo_' + new Date().getTime() + '.jpg';

    this.image = 'data:image/jpg;base64,' + file;
    this.task = this.storage.ref(filePath).putString(this.image, 'data_url');

    this.progress = this.task.percentageChanges();

    this.progress.subscribe(value => {
      if (value === 100) {
        this.storage.ref(filePath).getDownloadURL().subscribe(url => {
          if (url) {
            // console.log(url);
            this.presentAlertConfirm(url);
          }
        });
      }
    });
  }

  async uploadHandler() {
    const base64 = await this.captureImage();
    this.createUploadTask(base64);
  }

  async presentAlertConfirm(url) {
    const alert = await this.alertController.create({
      header: 'Vas a realitzar modificacions!',
      message: 'Vols guardar la nova fotografia?',
      buttons: [
        {
          text: Constants.Cancel,
          role: 'cancel',
          handler: (cancel) => {
            // console.log('Confirm Cancel: cancel');
            this.image = undefined;
          }
        }, {
          text: Constants.Ok,
          handler: () => {
            // console.log('Confirm Okay');
            this.usersService.updateProfilePhotoByUserId(this.afAuth.auth.currentUser.uid, url);
          }
        }
      ]
    });

    await alert.present();
  }
}
