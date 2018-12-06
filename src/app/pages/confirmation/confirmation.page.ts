import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {
  orderDone: string;
  queryOrderDetails: string;
  continueShopping: string;
  thanksForShopping: string;

  constructor() {
    this.orderDone = Constants.OrderDone;
    this.thanksForShopping = Constants.ThanksForShopping;
    this.queryOrderDetails = Constants.QueryOrderDetails;
    this.continueShopping = Constants.ContinueShopping;
  }

  ngOnInit() {
  }

}
