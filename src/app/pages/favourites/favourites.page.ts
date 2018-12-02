import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { tap, map } from 'rxjs/operators';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { Reorder } from '@ionic/angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favourite: string;
  filtered: Sneaker[];
  allSneakers: Sneaker[];

  constructor(private sneakerService: SneakerService, private afAuth: AngularFireAuth) {
    this.favourite = Constants.FavouritesList;
   }

  ngOnInit() {
    this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .pipe(
        map(sneakers => sneakers.sort((a: Sneaker, b: Sneaker) => new Date(b.dateLike).getTime() - new Date(a.dateLike).getTime())))
      .subscribe(sneakers => {
         this.filtered = this.allSneakers = sneakers;
         this.reorderSneakers();
       });
  }

  doRefresh(refresher) {
    this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .pipe(
        map(sneakers => sneakers.sort((a: Sneaker, b: Sneaker) => new Date(b.dateLike).getTime() - new Date(a.dateLike).getTime())))
      .subscribe(sneakers => {
         this.filtered = this.allSneakers = sneakers;
         this.reorderSneakers();
         refresher.target.complete();
      });
  }

  reorderSneakers() {
    this.filtered = this.allSneakers.slice().sort((n1: Sneaker, n2: Sneaker) => n1.sneakerSold - n2.sneakerSold);
  }
}
