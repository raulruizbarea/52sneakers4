import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AuthInfo } from 'src/app/shared/security/auth-info';
import { AuthService } from 'src/app/shared/security/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { SearchPage } from 'src/app/pages/search/search.page';
import { FilterPage } from 'src/app/pages/filter/filter.page';
import { Router } from '@angular/router';

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
    private modalCtrl: ModalController, private alertController: AlertController,
    private router: Router) {
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

  delete() {
    this.presentAlertConfirm();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Eliminar compte',
      message: 'Estàs segur? Vas a eliminar el teu compte!',
      buttons: [
        {
          text: Constants.Cancel,
          role: 'cancel',
          handler: (cancel) => {
            // this.presentAlert();
          }
        }, {
          text: Constants.Ok,
          handler: () => {
            // console.log('Confirm Ok');
            this.afAuth.authState
            .first()
            .subscribe(authState => {
              // console.log(authState);
              authState.delete()
              .then(_ => {
                console.log('deleted!');
                this.router.navigate(['/login']);
              })
              .catch(e => {
                console.error(e);
                this.presentAlert();
              });
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Operació no permesa',
      message: 'Aquesta operació és sensible i requereix autenticació recent. Tanca la sessió i torna a iniciar la sessió abans de tornar a intentar aquesta sol·licitud.',
      buttons: [{ text: 'Ok',
        handler: () => {
        // console.log('Confirm Ok');
      }}]
    });

    await alert.present();
  }
}
