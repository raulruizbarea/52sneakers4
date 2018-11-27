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

    dataToSave['sneakersPerUser/' + userKey + '/' + sneakerKey + '/date'] = data;
    dataToSave['usersPerSneaker/' + sneakerKey + '/' + userKey + '/date'] = data;

    return this.firebaseUpdate(dataToSave);
  }

  findLike(sneakerKey: string, userKey: string): any {
    // return this.db.list('usersPerSneaker/' + sneakerKey + '/' + userKey);
    this.sdkDb.ref('usersPerSneaker/' + sneakerKey).child(userKey).once('value', function(snapshot) {
      const exists = (snapshot.val() !== null);
      return exists;
    });
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
