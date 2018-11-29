import { Constants } from 'src/app/constants/app.constants';
import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { tap, map } from 'rxjs/operators';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  segmentValue: string;
  allSneakers: Sneaker[];
  filtered: Sneaker[];
  all: string;
  tendencies: string;
  newArrivals: string;

  constructor(private sneakerService: SneakerService, private afAuth: AngularFireAuth) {
    this.all = Constants.All;
    this.tendencies = Constants.Tendencies;
    this.newArrivals = Constants.NewArrivals;
    this.segmentValue = Constants.All;
   }

  ngOnInit() {
    console.log('ngOnInit HomePage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter HomePage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewWillEnter() {
    this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .pipe(
        map(sneakers => sneakers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
      .subscribe(sneakers => {
         this.allSneakers = this.filtered = sneakers;
         this.setSegment(this.segmentValue);
      });
  }

  filterAll() {
    this.filtered = this.allSneakers;
  }

  filterTendencies() {
    // TODO think about filtering by tendencies
  }

  filterNewArrivals() {
    const fromDate = new Date(Date.now());
    fromDate.setDate(fromDate.getDate() - 7);

    this.filtered = this.allSneakers.filter((item: Sneaker) => {
      return new Date(item.date).getTime() >= fromDate.getTime() &&
        new Date(item.date).getTime() <= new Date(Date.now()).getTime();
  });
  }

  doRefresh(refresher) {
    this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .pipe(
        map(sneakers => sneakers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
      .subscribe(sneakers => {
         this.allSneakers = this.filtered = sneakers;
         this.setSegment(this.segmentValue);
         refresher.target.complete();
      });
  }

  setSegment(valueSegment) {
    if (valueSegment === this.tendencies) {
      this.segmentValue = this.tendencies;
      this.filterTendencies();
    } else if (valueSegment === this.newArrivals) {
      this.segmentValue = this.newArrivals;
      this.filterNewArrivals();
    } else {
      this.segmentValue = this.all;
      this.filterAll();
    }
  }
}
