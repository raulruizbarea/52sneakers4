import { Component, OnInit } from '@angular/core';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { tap } from 'rxjs/operators';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AngularFireAuth } from 'angularfire2/auth';

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
      this.sneakerService.findAllSneakers().pipe(
        tap(console.log))
        .subscribe(
            sneakers => {
              this.allSneakers = sneakers;
              this.allSneakers.forEach(sneaker => {
                  // sneaker.like = this.sneakerService.isLike(sneaker.$key,  this.afAuth.auth.currentUser.uid);
                this.sneakerService.isLike(sneaker.$key,  this.afAuth.auth.currentUser.uid).subscribe(
                  like => {
                    sneaker.like = like;
                    // console.log(sneaker.like);
                  }
                );
              });
              // console.log(this.allSneakers);
              this.filtered = this.allSneakers;
            }
        );

  }

  search(search: string) {
    // this.filtered = this.allSneakers.filter(sneaker => sneaker.description.includes(search) );
  }
}
