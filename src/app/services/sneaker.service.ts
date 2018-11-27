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

  findAllSneakers(): Observable<Sneaker[]> {
    return this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(Sneaker.fromJsonList)
    );
  }

  createLike(sneakerKey: string, userKey: string, data: any) {
    this.db.object('sneakersPerUser/' + userKey + '/' + sneakerKey).update({ dateLike: data }).then(() => {
        console.log('Like sneakersPerUser created succesfully.');
    },
    err => {
      console.log(`Error creating like sneakersPerUser`);
    });
    this.db.object('usersPerSneaker/' + sneakerKey + '/' + userKey).update({ dateLike: data }).then(() => {
      console.log('Like usersPerSneaker created succesfully.');
    },
    err => {
      console.log(`Error creating like usersPerSneaker`);
    });
  }

  deleteLike(sneakerKey: string, userKey: string) {
    this.db.object('sneakersPerUser/' + userKey + '/' + sneakerKey + '/dateLike').remove().then(() => {
      console.log('Like sneakersPerUser deleted succesfully.');
    },
    err => {
      console.log(`Error deleting like sneakersPerUser`);
    });
    this.db.object('usersPerSneaker/' + sneakerKey + '/' + userKey + '/dateLike').remove().then(() => {
      console.log('Like usersPerSneaker deleted succesfully.');
    },
    err => {
      console.log(`Error deleting like usersPerSneaker`);
    });
  }

  isLike(sneakerKey: string, userKey: string): Observable<any> {
    const subject = new Subject();
    let exists = false;
    this.sdkDb.ref().child('usersPerSneaker/' + sneakerKey + '/' + userKey).on('value',
      snap => {
        // console.log('Received usersPerSneaker with a given Sneaker Id and User Id', snap.val());
        if (snap.val()) {
          if (snap.val().dateLike) {
             exists = true;
          }
        }
        subject.next(exists);
        subject.complete();
      });
      return subject.asObservable();
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.ref().update(dataToSave)
        .then(
            val => {
                subject.next(val);
                subject.complete();

            },
            err => {
                subject.error(err);
                subject.complete();
            }
        );

    return subject.asObservable();
  }
}
