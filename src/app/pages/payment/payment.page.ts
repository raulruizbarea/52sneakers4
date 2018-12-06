import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartPerUser, PaymentMethod, Status } from 'src/app/shared/model/order';
import { OrderService } from 'src/app/services/order.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit, AfterContentChecked {
  form: FormGroup;

  sneakers: CartPerUser[];
  total: number;

  selectPaymentMethod: string;
  orderConfirm: string;
  orderSummary: string;
  sizeTitle: string;
  articles: string;
  shippingCost: string;
  shipping: number;

  constructor(private fb: FormBuilder, private orderService: OrderService, private afAuth: AngularFireAuth,
    private router: Router) {
    this.selectPaymentMethod = Constants.SelectPaymentMethod;
    this.orderConfirm = Constants.OrderConfirm;
    this.orderSummary = Constants.OrderSummary;
    this.sizeTitle = Constants.Size;
    this.articles = Constants.Articles;
    this.shippingCost = Constants.ShippingCost;

    this.total = 0;
    this.shipping = 2.95;

    this.form = this.fb.group({
      catchPaymentMethod: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.orderService.findAllSneakersCartByUserKey(this.afAuth.auth.currentUser.uid)
    .subscribe(values => {
      // console.log(values);
      this.sneakers = values;
    });
  }

  ngAfterContentChecked() {
    // this.sneakers.forEach(value => this.quantity += parseFloat(value.sneaker.price));
    if (this.sneakers !== undefined) {
      this.total = this.sneakers.reduce((acc, val) =>
        val.sneaker !== undefined ? acc + (parseFloat(val.sneaker.price) * val.quantity) : 0, 0);
    }
  }

  save() {
    if (this.form.valid) {
      // console.log(this.form.controls['catchPaymentMethod'].value);
      let payment = 0;
      if ( this.form.controls['catchPaymentMethod'].value === 'card') {
        payment = PaymentMethod.Card;
      } else if (this.form.controls['catchPaymentMethod'].value === 'paypal') {
        payment = PaymentMethod.Paypal;
      }

      this.orderService.createNewOrder(this.afAuth.auth.currentUser.uid, {
        date: formatDate(new Date(), 'MM/dd/yyyy', 'en').toString(),
        paymentMethod: payment,
        shipping: this.shipping,
        status: Status.Confirmed,
        total: this.total
      }, this.sneakers).subscribe((values) => {
        this.orderService.deleteCartPerUserId(this.afAuth.auth.currentUser.uid);
        this.router.navigateByUrl('/main/tabs/(cart:confirmation)');
      });

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
}
