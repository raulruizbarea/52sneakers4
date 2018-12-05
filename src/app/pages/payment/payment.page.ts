import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  selectPaymentMethod: string;
  orderConfirm: string;

  constructor() {
    this.selectPaymentMethod = Constants.SelectPaymentMethod;
    this.orderConfirm = Constants.OrderConfirm;
  }

  ngOnInit() {
  }

  save() {

  }
}
