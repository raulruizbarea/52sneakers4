import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { SneakersPerOrder, Order, Status, PaymentMethod } from 'src/app/shared/model/order';
import { ActivatedRoute } from '@angular/router';
import { Constants } from 'src/app/constants/app.constants';
import { AngularFireAuth } from 'angularfire2/auth';
import { SneakerService } from 'src/app/services/sneaker.service';

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
  ratingClicked: number;
  rate: string;

  constructor(private orderService: OrderService, private route: ActivatedRoute,
    private afAuth: AngularFireAuth, private sneakerService: SneakerService) {
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
    this.rate = Constants.Rate;
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

  ratingComponentClick(clickObj: any): void {
    const item = this.sneakers.find(((i: any) => i.$key === clickObj.itemId));
    if (!!item) {
      // this.ratingClicked = clickObj.rating;
      // calculate rating
      item.sneaker.newRating = clickObj.rating;
    }
  }

  doRate() {
    // sneaker add vote
    // sneaker calculate rating;
    this.sneakers.forEach(element => {
      // console.log(element.$key + ' - ' + element.sneaker.newRating);
      if (element.sneaker.newRating) {
        this.sneakerService.calculateRating(element.$key, element.sneaker.rating, element.sneaker.newRating, element.sneaker.votes + 1);
      } else {
        this.sneakerService.calculateRating(element.$key, element.sneaker.rating, 0, element.sneaker.votes + 1);
      }
      this.sneakerService.updateVotes(element.$key, element.sneaker.votes + 1);
    });

    // order rated = true
    this.orderService.updateRated(this.order.$key, this.afAuth.auth.currentUser.uid);
  }
}
