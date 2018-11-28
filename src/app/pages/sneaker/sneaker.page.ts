import { AngularFireAuth } from 'angularfire2/auth';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/services/sneaker.service';
import { MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { tap } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-sneaker',
  templateUrl: './sneaker.page.html',
  styleUrls: ['./sneaker.page.scss'],
})
export class SneakerPage implements OnInit, OnDestroy {
  sneaker: Sneaker;

  constructor(private route: ActivatedRoute, private menuCtrl: MenuController,
    private afAuth: AngularFireAuth, private sneakerService: SneakerService) {
    this.menuCtrl.enable(false);
    console.log(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    console.log('ngOnInit SneakerPage');

    /*
    this.sneakerService.findSneakerByKey(this.route.snapshot.paramMap.get('id')).subscribe(
      (sneaker) => {
        this.sneaker = sneaker;
      },
      err => {
        console.log(`Error finding sneaker ${err}`);
      }
    );
    */

    this.sneakerService.findSneakerByKeyWithLike(this.route.snapshot.paramMap.get('id'), this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .subscribe(sneaker => {
         this.sneaker = sneaker;
      });
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
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
}
