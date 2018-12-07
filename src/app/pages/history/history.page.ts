import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Order, Status } from 'src/app/shared/model/order';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  orders: Order[];
  noValues: string;
  history: string;
  orderId: string;
  status: string;
  date: string;
  total: string;
  statusOrder = Status;
  inProgress: string;
  delivered: string;
  confirmed: string;
  finished: string;

  constructor(private orderService: OrderService, private afAuth: AngularFireAuth) {
    this.noValues = Constants.NoOrders;
    this.history = Constants.HistoryList;
    this.orderId = Constants.OrderId;
    this.status = Constants.Status;
    this.date = Constants.Date;
    this.total = Constants.Total;
    this.confirmed = Constants.Confirmed;
    this.inProgress = Constants.InProgress;
    this.delivered = Constants.Delivered;
    this.finished = Constants.Finished;
  }

  ngOnInit() {
    this.orderService.findAllOrdersByUserKey(this.afAuth.auth.currentUser.uid)
    .map(orders => orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    .subscribe(values => {
      this.orders = values;
    });
  }

  doRefresh(refresher) {
    this.orderService.findAllOrdersByUserKey(this.afAuth.auth.currentUser.uid)
    .map(orders => orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    .subscribe(values => {
      this.orders = values;
      refresher.target.complete();
    });
  }
}
