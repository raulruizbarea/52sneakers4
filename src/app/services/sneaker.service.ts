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

  createNewLike(sneakerKey: string, userKey: string, data: any): Observable<any> {
    const dataToSave = {};

    dataToSave['sneakersPerUser/' + userKey + '/' + sneakerKey + '/dateLike'] = data;
    dataToSave['usersPerSneaker/' + sneakerKey + '/' + userKey + '/dateLike'] = data;

    return this.firebaseUpdate(dataToSave);
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
