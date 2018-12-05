import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/model/user';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.page.html',
  styleUrls: ['./shipping.page.scss'],
})
export class ShippingPage implements OnInit {
  user: User;

  form: FormGroup;

  phone: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;

  shippingAddress: string;
  whereShipping: string;
  continuePayment: string;
  shippingInfo: string;

  constructor(private fb: FormBuilder, private usersService: UsersService,
    private afAuth: AngularFireAuth, private navCtrl: NavController) {
    this.shippingAddress = Constants.ShippingAddres;
    this.whereShipping = Constants.WhereAreYouGoingToShip;
    this.continuePayment = Constants.ContinueShipping;
    this.shippingInfo = Constants.ShippingInfo;

    this.phone = Constants.PhoneNumber;
    this.address = Constants.Address;
    this.postalCode = Constants.PostalCode;
    this.city = Constants.City;
    this.country = Constants.Country;

    this.form = this.fb.group({
      phone: [''],
      address: ['', Validators.compose([Validators.required])],
      postalCode: ['', Validators.compose([Validators.required])],
      city: ['', Validators.compose([Validators.required])],
      country: ['', Validators.compose([Validators.required])],
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

  isErrorVisible(field: string, error: string) {
    if (!this.form.controls[field]) {
      return false;
    }
    return this.form.controls[field].dirty
            && this.form.controls[field].errors &&
            this.form.controls[field].errors[error];
  }

  save() {
    if (this.form.valid) {
      this.user.phone = this.form.controls['phone'].value;
      this.user.address = this.form.controls['address'].value;
      this.user.postalCode = this.form.controls['postalCode'].value;
      this.user.city = this.form.controls['city'].value;
      this.user.country = this.form.controls['country'].value;

      this.usersService.updateUserByUserId(this.afAuth.auth.currentUser.uid, this.user)
        .subscribe(
            () => {
              console.log('User updated succesfully.');
              this.navCtrl.navigateForward('/main/tabs/(cart:payment)');
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

}
