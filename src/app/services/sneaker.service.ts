import { Injectable, Inject } from '@angular/core';
import { Sneaker } from '../shared/model/sneaker';
import { Observable, Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from '@angular/fire';

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
}
