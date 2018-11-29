import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AuthInfo } from 'src/app/shared/security/auth-info';
import { AuthService } from 'src/app/shared/security/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { SearchPage } from 'src/app/pages/search/search.page';

@Component({
  selector: 'sneaker-header',
  templateUrl: './sneaker-header.component.html',
  styleUrls: ['./sneaker-header.component.scss'],
})
export class SneakerHeaderComponent implements OnInit {
  @Input() appName: string;
  authInfo: AuthInfo;

  back: string;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth,
    private navCtrl: NavController, private modalCtrl: ModalController) {
    this.appName = Constants.AppName;
    this.back = Constants.Back;
  }

  isLoggedIn() {
    return this.afAuth.auth.currentUser;
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
    // TODO: Check if the current user has items in the table "Order" with status "0" and update the badge
  }

  navigateToSearch() {
    this.openModal(SearchPage);
  }

  navigateToCart() {
    this.navCtrl.navigateForward('/cart');
  }

  async openModal(comp) {
    const modal = await this.modalCtrl.create({
     component: comp,
   });

   return await modal.present();
  }
}
