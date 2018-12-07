import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Order } from 'src/app/shared/model/order';
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

  constructor(private orderService: OrderService, private afAuth: AngularFireAuth) {
    this.noValues = Constants.NoOrders;
    this.history = Constants.HistoryList;
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
