import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  pay: string;
  quantity = 0;

  constructor() {
    this.pay = Constants.Pay;
  }

  ngOnInit() {
  }

  increment () {
    this.quantity++;
  }

  decrement () {
    this.quantity--;
  }
}
