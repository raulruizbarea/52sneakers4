import { Component, OnInit, ViewChild } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { SneakersPerUser } from 'src/app/shared/model/sneaker';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {
  @ViewChild('dynamicList') dynamicList;
  favourite: string;
  noValues: string;
  sspu: SneakersPerUser[];
  delete: string;

  constructor(private sneakerService: SneakerService, private afAuth: AngularFireAuth) {
    this.favourite = Constants.FavouritesList;
    this.noValues = Constants.NoFavourites;
    this.delete = Constants.Delete;
   }

  ngOnInit() {
    this.sneakerService.findAllSneakersLikedByUserKey(this.afAuth.auth.currentUser.uid)
    .map(sneakers => sneakers.sort((a, b) => new Date(b.likedDate).getTime() - new Date(a.likedDate).getTime()))
    .subscribe(values => {
      // console.log(values);
      this.sspu = values;
    });
  }

  doRefresh(refresher) {
    this.sneakerService.findAllSneakersLikedByUserKey(this.afAuth.auth.currentUser.uid)
    .map(sneakers => sneakers.sort((a, b) => new Date(b.likedDate).getTime() - new Date(a.likedDate).getTime()))
    .subscribe(values => {
      // console.log(values);
      this.sspu = values;
      refresher.target.complete();
    });
  }

  alert(sneakerUser) {
    // console.log(item);
    this.dynamicList.closeSlidingItems();
    this.sneakerService.deleteLike(sneakerUser.$key, this.afAuth.auth.currentUser.uid);
  }
}
