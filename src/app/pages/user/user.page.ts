import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'src/app/shared/model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Constants } from 'src/app/constants/app.constants';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;

  form: FormGroup;
  saveUser: string;

  name: string;
  surnames: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;

  constructor(private fb: FormBuilder, private usersService: UsersService,
     private afAuth: AngularFireAuth, private navCtrl: NavController, private alertController: AlertController) {
    this.name = Constants.Name;
    this.surnames = Constants.Surnames;
    this.phone = Constants.Phone;
    this.address = Constants.Address;
    this.postalCode = Constants.PostalCode;
    this.city = Constants.City;
    this.country = Constants.Country;

    this.saveUser = Constants.Save;

    this.form = this.fb.group({
      name:  ['', Validators.compose([Validators.required])],
      surnames:  ['', Validators.compose([Validators.required])],
      phone: [''],
      address: [''],
      postalCode: [''],
      city: [''],
      country: ['']
    });
  }

  ngOnInit() {
    this.usersService.findUserById(this.afAuth.auth.currentUser.uid)
      .subscribe(
        value => {
          // console.log(value);
          this.user = value;
        },
        err => console.log(`Error finding user ${err}`));
  }

  save() {
    if (this.form.valid) {
      this.user.name = this.form.controls['name'].value;
      this.user.surnames = this.form.controls['surnames'].value;
      this.user.phone = this.form.controls['phone'].value;
      this.user.address = this.form.controls['address'].value;
      this.user.postalCode = this.form.controls['postalCode'].value;
      this.user.city = this.form.controls['city'].value;
      this.user.country = this.form.controls['country'].value;

      this.usersService.updateUserByUserId(this.afAuth.auth.currentUser.uid, this.user)
        .subscribe(
            () => {
              console.log('User updated succesfully.');
              this.navCtrl.goBack();
            },
            err => {
              console.log(`Error updating user ${err}`);
            }
        );
    } else {
      console.log('error');
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

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Vas a realitzar modificacions!',
      message: 'Segur que vols desar els canvis?',
      buttons: [
        {
          text: Constants.Cancel,
          role: 'cancel',
          handler: (cancel) => {
            // console.log('Confirm Cancel: cancel');
          }
        }, {
          text: Constants.Ok,
          handler: () => {
            // console.log('Confirm Okay');
            this.save();
          }
        }
      ]
    });

    await alert.present();
  }
}
