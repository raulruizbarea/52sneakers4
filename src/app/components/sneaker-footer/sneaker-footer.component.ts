import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'sneaker-footer',
  templateUrl: './sneaker-footer.component.html',
  styleUrls: ['./sneaker-footer.component.scss']
})
export class SneakerFooterComponent implements OnInit {
  // authInfo: AuthInfo;
  footerTitle: string;

  constructor() {
    this.footerTitle = Constants.FooterTitle;
  }

  ngOnInit() {
    // this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }

  /* isLoggedIn() {
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
  } */
}
