import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { tap } from 'rxjs/operators';
import { Sneaker } from 'src/app/shared/model/sneaker';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  favourite: string;
  sneakers: Sneaker[];

  constructor(private sneakerService: SneakerService, private afAuth: AngularFireAuth) {
    this.favourite = Constants.Favourites;
   }

  ngOnInit() {
    this.sneakerService.findAllSneakersLikedByUser(this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .subscribe(sneaker => {
         console.log(sneaker);
      });
  }

}
