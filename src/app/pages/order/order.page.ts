import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { SneakersPerOrder, Order, Status, PaymentMethod } from 'src/app/shared/model/order';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  sneakers: SneakersPerOrder[];
  order: Order;
  statusOrder = Status;

  orderConfirm: string;
  orderSummary: string;
  sizeTitle: string;
  articles: string;
  shippingCost: string;
  shipping: number;
  history: string;
  orderId: string;
  status: string;
  date: string;
  inProgress: string;
  delivered: string;
  confirmed: string;
  finished: string;
  method: string;
  card: string;
  paypal: string;
  paymentOrder = PaymentMethod;

  constructor(private orderService: OrderService, private route: ActivatedRoute) {
    this.orderConfirm = Constants.OrderConfirm;
    this.orderSummary = Constants.OrderSummary;
    this.sizeTitle = Constants.Size;
    this.articles = Constants.Articles;
    this.shippingCost = Constants.ShippingCost;
    this.history = Constants.HistoryList;
    this.orderId = Constants.OrderId;
    this.status = Constants.Status;
    this.date = Constants.Date;
    this.confirmed = Constants.Confirmed;
    this.inProgress = Constants.InProgress;
    this.delivered = Constants.Delivered;
    this.finished = Constants.Finished;
    this.card = Constants.Card;
    this.method = Constants.PaymentMethod;
    this.paypal = Constants.Paypal;
   }

  ngOnInit() {
    this.orderService.findAllSneakersByOrderKey(this.route.snapshot.paramMap.get('id'))
    .subscribe(values => {
      // console.log(values);
      this.sneakers = values;
    });

    this.orderService.findOrderByOrderKey(this.route.snapshot.paramMap.get('id'))
    .subscribe(values => {
      // console.log(values);
      this.order = values;
    });
  }

}
