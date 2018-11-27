import { Component, OnInit, Input } from '@angular/core';
import { Sneaker } from 'src/app/shared/model/sneaker';
import { SneakerService } from 'src/app/services/sneaker.service';
import { AuthService } from 'src/app/shared/security/auth.service';
import { FirebaseAuth } from '@angular/fire';
import { AngularFireAuth } from 'angularfire2/auth';
import { formatDate } from '@angular/common';

@Component({
  selector: 'sneaker-cards-list',
  templateUrl: './sneaker-cards-list.component.html',
  styleUrls: ['./sneaker-cards-list.component.scss']
})
export class SneakerCardsListComponent implements OnInit {
  @Input() sneakers: Sneaker[];

  constructor(private afAuth: AngularFireAuth, private sneakerService: SneakerService) { }

  ngOnInit() {
    // console.log(this.sneakers);
  }

  doLike(key) {
    console.log('like: ' + key);
    console.log(this.afAuth.auth.currentUser.uid);
    const like = this.sneakers.find(query => query.$key === key).like;

    if (like) {
      this.sneakerService.deleteLike(key, this.afAuth.auth.currentUser.uid);
    } else {
      this.sneakerService.createLike(key, this.afAuth.auth.currentUser.uid,
        formatDate(new Date(), 'MM/dd/yyyy', 'en').toString());
    }

    this.sneakers.find(query => query.$key === key).like = !like;
  }
}
