import { Injectable, Inject } from '@angular/core';
import { Sneaker, SneakersPerUser } from '../shared/model/sneaker';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from '@angular/fire';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDb = fb.database();
  }

  findAllSneakersNameDesc(): Observable<Sneaker[]> {
    return this.db.list('sneakers', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(Sneaker.fromJsonList)
    );
  }

  findAllSneakersWithLike(userKey: string): Observable<Sneaker[]> {
    return this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as Sneaker;
          data.$key = c.payload.key;
          this.sdkDb.ref('usersPerSneaker/' + data.$key + '/' + userKey).once('value')
            .then(function(snapshot) {
              // console.log(snapshot.val());
              const hasLikedDate = snapshot.hasChild('likedDate');
              data.like = hasLikedDate;
              if (hasLikedDate) {
                data.likedDate = snapshot.val().likedDate;
              }
            });
          return data;
        });
      }),
    );
  }

  findSneakerByKeyWithLike(key: string, userKey: string): Observable<{}> {
    const subject = new Subject();

    this.db.list('sneakers', ref => ref.orderByKey().equalTo(key)).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as Sneaker;
          data.$key = c.payload.key;
          this.sdkDb.ref('usersPerSneaker/' + data.$key + '/' + userKey).once('value')
            .then(function(snapshot) {
              const hasLikedDate = snapshot.hasChild('likedDate');
              data.like = hasLikedDate;
            });
          return data;
        });
      }),
      map(changes => changes[0])
    ).subscribe(values => {
      subject.next(values);
      subject.complete();
    }, err => {
        subject.error(err);
        subject.complete();
    });

    return subject.asObservable();
  }

  createLike(sneakerKey: string, userKey: string, data: any) {
    this.db.object('sneakersPerUser/' + userKey + '/' + sneakerKey).update({ likedDate: data }).then(() => {
        console.log('Like sneakersPerUser created succesfully.');
    },
    err => {
      console.log(`Error creating like sneakersPerUser`);
    });
    this.db.object('usersPerSneaker/' + sneakerKey + '/' + userKey).update({ likedDate: data }).then(() => {
      console.log('Like usersPerSneaker created succesfully.');
    },
    err => {
      console.log(`Error creating like usersPerSneaker`);
    });
  }

  deleteLike(sneakerKey: string, userKey: string) {
    this.db.object('sneakersPerUser/' + userKey + '/' + sneakerKey + '/likedDate').remove().then(() => {
      console.log('Like sneakersPerUser deleted succesfully.');
    },
    err => {
      console.log(`Error deleting like sneakersPerUser`);
    });
    this.db.object('usersPerSneaker/' + sneakerKey + '/' + userKey + '/likedDate').remove().then(() => {
      console.log('Like usersPerSneaker deleted succesfully.');
    },
    err => {
      console.log(`Error deleting like usersPerSneaker`);
    });
  }

  findAllSneakersLikedByUserKey(userKey: string): Observable<SneakersPerUser[]> {
    return this.db.list('sneakersPerUser/' + userKey).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as SneakersPerUser;
          data.$key = c.payload.key;
          this.sdkDb.ref('sneakers/' + data.$key).once('value')
            .then(function(snapshot) {
              data.sneaker = snapshot.val();
            });
          return data;
        });
      }),
    );
  }

  calculateRating(sneakerKey: string, rating: number, newRating: number, votes: number) {
    console.log(rating + ' ' + newRating + ' ' + votes);
    const rate = (rating + newRating) / votes;
    this.db.object('sneakers/' + sneakerKey).update({ rating: rate }).then(() => {
      console.log('Rating updated succesfully.');
    },
    err => {
      console.log(`Error updating rating`);
    });
  }

  updateVotes(sneakerKey: string, votes: number) {
    this.db.object('sneakers/' + sneakerKey).update({ votes: votes }).then(() => {
      console.log('Increase votes sneaker updated succesfully.');
    },
    err => {
      console.log(`Error increasing votes sneaker`);
    });
  }
}
