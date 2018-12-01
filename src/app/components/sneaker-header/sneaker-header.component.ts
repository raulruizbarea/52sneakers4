import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AuthInfo } from 'src/app/shared/security/auth-info';
import { AuthService } from 'src/app/shared/security/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchPage } from 'src/app/pages/search/search.page';
import { FilterPage } from 'src/app/pages/filter/filter.page';

@Component({
  selector: 'sneaker-header',
  templateUrl: './sneaker-header.component.html',
  styleUrls: ['./sneaker-header.component.scss'],
})
export class SneakerHeaderComponent implements OnInit {
  @Input() appName: string;
  @Input() hideHomeMenu: boolean;
  @Input() hideProfileMenu: boolean;
  authInfo: AuthInfo;

  back: string;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth,
    private modalCtrl: ModalController) {
    this.appName = Constants.AppName;
    this.back = Constants.Back;
    this.hideHomeMenu = false;
    this.hideProfileMenu = false;
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

  navigateToFilter() {
    this.openModal(FilterPage);
  }

  async openModal(comp) {
    const modal = await this.modalCtrl.create({
     component: comp,
   });

   return await modal.present();
  }
}
