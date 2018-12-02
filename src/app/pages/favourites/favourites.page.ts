import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { tap, map } from 'rxjs/operators';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { Reorder } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favourite: string;
  filtered: Observable<Sneaker[]>;
  allSneakers: Sneaker[];

  constructor(private sneakerService: SneakerService, private afAuth: AngularFireAuth) {
    this.favourite = Constants.FavouritesList;
   }

  ngOnInit() {
    this.filtered = this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid)
      .map(sneakers => sneakers.sort((a: Sneaker, b: Sneaker) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  }

  doRefresh(refresher) {
      this.filtered = this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid)
      .map(sneakers => sneakers.sort((a: Sneaker, b: Sneaker) => new Date(b.date).getTime() - new Date(a.date).getTime()));

      this.filtered.subscribe(values => refresher.target.complete());
  }
}
