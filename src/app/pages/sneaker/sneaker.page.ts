import { AngularFireAuth } from 'angularfire2/auth';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/services/sneaker.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Constants } from 'src/app/constants/app.constants';

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

  constructor(private route: ActivatedRoute, private menuCtrl: MenuController,
    private afAuth: AngularFireAuth, private sneakerService: SneakerService) {
    // console.log(this.route.snapshot.paramMap.get('id'));
    this.addToCart = Constants.AddToCart;
    this.sizeTitle = Constants.Size;
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
    // console.log($event.target.value);
    if ($event.target.value !== undefined && $event.target.value !== '') {
      this.disableBtn = false;
    }
  }
}
