import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { App, Platform, MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/security/auth.service';
import { SubscriptionPage } from 'src/app/pages/subscription/subscription.page';
import { ContactPage } from 'src/app/pages/contact/contact.page';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  menuTitle: string;
  rootPage: any;
  pages: any;
  selectedMenu: any;
  disconnect: string;

  constructor(public app: App, public router: Router, private authService: AuthService,
    public platform: Platform, public menuCtrl: MenuController, private modalCtrl: ModalController) {
    this.menuTitle = Constants.Menu;
    this.disconnect = Constants.Disconnect;
    this.initializeApp();
  }

  ngOnInit() {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.pages = this.getSideMenus();
    });
  }

  getSideMenus() {
    return [{
      title: Constants.Home, url: '/home', icon: 'home'
    }, {
      title: Constants.News, url: '/news', icon: 'book'
    }, {
      title: Constants.Subscription, modal: SubscriptionPage, icon: 'wifi'
    }, {
      title: Constants.Contact, modal: ContactPage, icon: 'mail'
    }];
  }

  openPage(page, index) {
    if (page.url) {
      this.router.navigate([page.url]);
      this.menuCtrl.close();
    } else if (page.modal) {
      this.openModal(page.modal);
    } else {
      if (this.selectedMenu) {
        this.selectedMenu = 0;
      } else {
        this.selectedMenu = index;
      }
    }
  }

  async openModal(comp) {
    const modal = await this.modalCtrl.create({
     component: comp
   });

   return await modal.present();
  }

  logout() {
    this.authService.logout();
  }
}
