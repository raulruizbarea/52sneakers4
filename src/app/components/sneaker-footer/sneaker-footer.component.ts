import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthInfo } from 'src/app/shared/security/auth-info';
import { AuthService } from 'src/app/shared/security/auth.service';
import { ModalController, NavController } from '@ionic/angular';
import { FilterPage } from 'src/app/pages/filter/filter.page';

@Component({
  selector: 'sneaker-footer',
  templateUrl: './sneaker-footer.component.html',
  styleUrls: ['./sneaker-footer.component.scss']
})
export class SneakerFooterComponent implements OnInit {
  authInfo: AuthInfo;
  footerTitle: string;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService,
    private modalCtrl: ModalController, private navCtrl: NavController) {
    this.footerTitle = Constants.FooterTitle;
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }

  isLoggedIn() {
    return this.afAuth.auth.currentUser;
  }

  navigateToFilter() {
    this.openModal(FilterPage);
  }

  navigateToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  async openModal(comp) {
    const modal = await this.modalCtrl.create({
     component: comp,
   });

   return await modal.present();
  }
}
