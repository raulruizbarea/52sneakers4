import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { OrderService } from 'src/app/services/order.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  total: number;

  home: string;
  news: string;
  profile: string;
  cart: string;

  constructor(private orderService: OrderService, private afAuth: AngularFireAuth) {
    this.home = Constants.Home;
    this.news = Constants.News;
    this.profile = Constants.Profile;
    this.cart = Constants.Cart;
    this.total = 0;
  }

  ngOnInit() {
    /* this.orderService.countCartByUserKey(this.afAuth.auth.currentUser.uid).subscribe(values => {
      this.total = values.length;
    }); */
    this.orderService.findAllSneakersCartByUserKey(this.afAuth.auth.currentUser.uid)
    .subscribe(values => {
      this.total = 0;
      values.forEach(value => {
        this.total += value.quantity;
      });
    });
  }
}
