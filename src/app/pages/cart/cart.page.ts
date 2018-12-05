import { Component, OnInit, AfterContentChecked, ViewChild } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { OrderService } from 'src/app/services/order.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { CartPerUser } from 'src/app/shared/model/order';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, AfterContentChecked {
  @ViewChild('dynamicList') dynamicList;
  pay: string;
  noValues: string;
  sneakers: CartPerUser[];
  sizeTitle: string;
  total: number;
  numItems: number;
  articles: string;
  delete: string;

  constructor(private orderService: OrderService, private afAuth: AngularFireAuth) {
    this.pay = Constants.Pay;
    this.noValues = Constants.NoCart;
    this.sizeTitle = Constants.Size;
    this.articles = Constants.Articles;
    this.delete = Constants.Delete;
    this.total = 0;
    this.numItems = 0;
  }

  ngOnInit() {
    this.orderService.findAllSneakersCartByUserKey(this.afAuth.auth.currentUser.uid)
    .subscribe(values => {
      console.log(values);
      this.sneakers = values;
    });
  }

  ngAfterContentChecked() {
    // this.sneakers.forEach(value => this.quantity += parseFloat(value.sneaker.price));
    if (this.sneakers !== undefined) {
      this.total = this.sneakers.reduce((acc, val) =>
        val.sneaker !== undefined ? acc + (parseFloat(val.sneaker.price) * val.quantity) : 0, 0);
      this.numItems = this.sneakers.reduce((acc, val) =>
        val.sneaker !== undefined ? acc + val.quantity : 0, 0);
    }
  }

  alert(item) {
    // console.log(item);
    this.dynamicList.closeSlidingItems();
    this.orderService.deleteSneakerToCart(item.$key, this.afAuth.auth.currentUser.uid);
  }

  increment(cart: CartPerUser) {
     this.orderService.incrementCartPerUserSneakerQuantityByUserKey(this.afAuth.auth.currentUser.uid,
       cart.$key, cart.quantity + 1);
  }

  decrement(cart: CartPerUser) {
    if (cart.quantity - 1 !== 0) {
      this.orderService.decrementCartPerUserSneakerQuantityByUserKey(this.afAuth.auth.currentUser.uid,
        cart.$key, cart.quantity - 1);
    }
  }
}
