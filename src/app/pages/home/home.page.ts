import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { tap } from 'rxjs/operators';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { log } from 'src/app/helpers/helpers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  allSneakers: Sneaker[];
  filtered: Sneaker[];

  constructor(private sneakerService: SneakerService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    console.log('ngOnInit HomePage');
  }

  search(search: string) {
    // this.filtered = this.allSneakers.filter(sneaker => sneaker.description.includes(search) );
  }

  ionViewWillEnter() {
    this.sneakerService.findAllSneakersWithLike(this.afAuth.auth.currentUser.uid).pipe(
      tap(console.log))
      .subscribe(sneakers => {
         this.allSneakers = this.filtered = sneakers;
      });
  }
}
