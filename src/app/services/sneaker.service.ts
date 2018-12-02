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

  findAllSneakersNameDesc(): Observable<Sneaker[]> {
    return this.db.list('sneakers', ref => ref.orderByChild('name')).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(Sneaker.fromJsonList)
    );
  }

  findAllSneakersWithLike(userKey: string): Observable<{}> {
    const subject = new Subject();

    this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as Sneaker;
          data.$key = c.payload.key;
          this.sdkDb.ref('usersPerSneaker/' + data.$key + '/' + userKey).once('value')
            .then(function(snapshot) {
              const hasDateLike = snapshot.hasChild('dateLike');
              data.like = hasDateLike;
              if (hasDateLike) {
                data.dateLike = snapshot.val().dateLike;
              }
            });
          return data;
        });
      }),
    ).subscribe(values => {
      subject.next(values);
      subject.complete();
    }, err => {
        subject.error(err);
        subject.complete();
    });

    return subject.asObservable();
  }

  /* findSneakerByKey(key: string): Observable<{}> {
    const subject = new Subject();

    this.db.list('sneakers', ref => ref.orderByKey().equalTo(key)).snapshotChanges().pipe(
      // map(changes => changes[0]),
      tap(console.log),
      // filter(changes => changes && changes.length > 0),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(changes => changes[0])
    ).subscribe(values => {
      subject.next(values);
      subject.complete();
    }, err => {
        subject.error(err);
        subject.complete();
    });

    return subject.asObservable();
  } */

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
              const hasDateLike = snapshot.hasChild('dateLike');
              data.like = hasDateLike;
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
          }, err => {
            subject.error(err);
            subject.complete();
        });
      return subject.asObservable();
  }

  isLike2(sneakerKey: string, userKey: string): Observable<any> {
    const subject = new Subject();
    let exists = false;

    this.sdkDb.ref('usersPerSneaker/' + sneakerKey + '/' + userKey).once('value')
            .then(() => function(snapshot) {
              const hasDateLike = snapshot.hasChild('dateLike');
              // console.log('Like: ' + hasDateLike);
              exists = hasDateLike;
              subject.next(exists);
              subject.complete();
            }, err => {
              subject.error(err);
              subject.complete();
            });
      return subject.asObservable();
  }

  findAllSneakersLikedByUser(userKey: string): Observable<{}> {
    const subject = new Subject();

    this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as Sneaker;
          data.$key = c.payload.key;
          this.sdkDb.ref('sneakersPerUser/' + userKey + '/' + data.$key).once('value')
            .then(function(snapshot) {
              const hasDateLike = snapshot.hasChild('dateLike');
              data.like = hasDateLike;
            });
          return data;
        });
      }),
    ).subscribe(values => {
      subject.next(values);
      subject.complete();
    }, err => {
        subject.error(err);
        subject.complete();
    });

    return subject.asObservable();
  }
}
