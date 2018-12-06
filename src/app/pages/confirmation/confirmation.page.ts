import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

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
  returnToCart: string;

  constructor(private orderService: OrderService, private router: Router) {
    this.orderDone = Constants.OrderDone;
    this.thanksForShopping = Constants.ThanksForShopping;
    this.queryOrderDetails = Constants.QueryOrderDetails;
    this.continueShopping = Constants.ContinueShopping;
    this.returnToCart = Constants.ReturnToCart;
  }

  ngOnInit() {
  }

  navigateToHome() {
    this.router.navigateByUrl('/main/tabs/(home:home)');
  }
  navigateToCart() {
    this.router.navigateByUrl('/main/tabs/(cart:cart)');
  }

  navigateToOrderDetail() {
    this.router.navigateByUrl('/main/tabs/(profile:order/' + this.orderService.storage + ')');
  }
}
