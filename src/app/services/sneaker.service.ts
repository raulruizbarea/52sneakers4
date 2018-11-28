import { Injectable, Inject } from '@angular/core';
import { Sneaker } from '../shared/model/sneaker';
import { Observable, Subject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
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

  findAllSneakersWithLike(userKey: string): Observable<Sneaker[]> {
    return this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(changes => changes.forEach(sneaker => {
        console.log('Sneaker: ' + sneaker);
        this.db.object('usersPerSneaker/' + sneaker.$key + '/' + userKey + '/dateLike')
          .snapshotChanges()
            .subscribe(action => {
            // console.log(action.type);
            // console.log(action.key);
            // console.log(action.payload.val());
            if (action.key) {
              sneaker.like = true;
            } else {
              sneaker.like = false;
            }
          });
        console.log(changes);
      }),
      ),
    );
  }

  findAllSneakersWithIsLike(userKey: string): Observable<{}> {
    const subject = new Subject();

    this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(changes => changes.forEach(sneaker => {
        console.log('Sneaker: ' + sneaker);
        this.db.object('usersPerSneaker/' + sneaker.$key + '/' + userKey + '/dateLike')
          .snapshotChanges()
            .subscribe(action => {
            // console.log(action.type);
            // console.log(action.key);
            // console.log(action.payload.val());
            if (action.key) {
              sneaker.like = true;
            } else {
              sneaker.like = false;
            }
          });
        console.log(changes);
        subject.next(changes);
        subject.complete();
      }),
      ),
    );

    return subject.asObservable();
  }

  getFavs(userKey: string): Observable<Sneaker[]> {
    return this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      switchMap(changes => {
        return changes.map(c => {
          const data = c.payload.val() as Sneaker;
          data.$key = c.payload.key;
          // like: true,
          // this.db.object('usersPerSneaker/' + data.$key + '/' + userKey + '/dateLike')
          //  .snapshotChanges().subscribe(value => data.like = ((value.key) ? true : false));
          // data.like =
          // console.log(this.db.list('usersPerSneaker/' + data.$key + '/' + userKey + '/dateLike', query =>
          //  query.orderByChild('dateLike').equalTo(null)).snapshotChanges());
          this.sdkDb.ref('usersPerSneaker/' + data.$key + '/' + userKey).once('value')
            .then(function(snapshot) {
              const hasDateLike = snapshot.hasChild('dateLike');
              // console.log('Like: ' + hasDateLike);
              data.like = hasDateLike;
            });
          return data;
        });
      }),
       // tap(console.log),
       // map(Sneaker.fromJsonList)
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
    this.db.object('usersPerSneaker/' + sneakerKey + '/' + userKey + '/dateLike')
          .snapshotChanges()
            .subscribe(action => {
            // console.log(action.type);
            // console.log(action.key);
            // console.log(action.payload.val());
            if (action.key) {
              exists = true;
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
