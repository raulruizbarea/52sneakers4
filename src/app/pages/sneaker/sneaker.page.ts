import { AngularFireAuth } from 'angularfire2/auth';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/services/sneaker.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Constants } from 'src/app/constants/app.constants';
import { OrderService } from 'src/app/services/order.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sneaker',
  templateUrl: './sneaker.page.html',
  styleUrls: ['./sneaker.page.scss'],
})
export class SneakerPage implements OnInit {
  sneaker: Sneaker;
  addToCart: string;
  sizeTitle: string;
  sizes: string[];
  disableBtn: boolean;
  sizeSneaker: string;
  categoriesFilter: string[];
  sportsFilter: string[];

  constructor(private route: ActivatedRoute, private orderService: OrderService,
    private afAuth: AngularFireAuth, private sneakerService: SneakerService, private navCtrl: NavController) {
    // console.log(this.route.snapshot.paramMap.get('id'));
    this.addToCart = Constants.AddToCart;
    this.sizeTitle = Constants.ChooseSize;
    this.disableBtn = true;
   }

  ngOnInit() {
    console.log('ngOnInit SneakerPage');

    this.sneakerService.findSneakerByKeyWithLike(this.route.snapshot.paramMap.get('id'), this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .subscribe(sneaker => {
         this.sneaker = sneaker;
         // console.log(this.sneaker.sizes);
         this.sizes = Object.keys(this.sneaker.sizes);
         this.sportsFilter = Object.keys(this.sneaker.sports);
         this.categoriesFilter = Object.keys(this.sneaker.categories);
      });
  }

  doLike(key) {
    const like = this.sneaker.like;

    if (like) {
      this.sneakerService.deleteLike(key, this.afAuth.auth.currentUser.uid);
    } else {
      this.sneakerService.createLike(key, this.afAuth.auth.currentUser.uid,
        formatDate(new Date(), 'MM/dd/yyyy', 'en').toString());
    }

    this.sneaker.like = !like;
  }

  canAdd($event) {
    this.sizeSneaker = $event.target.value;
    if (this.sizeSneaker !== undefined && this.sizeSneaker !== '') {
      this.disableBtn = false;
    }
  }

  addSneakerToCart() {
    this.orderService.addSneakerToCart(this.sneaker.$key, this.afAuth.auth.currentUser.uid, this.sizeSneaker);
    this.navCtrl.goBack();
  }
}
