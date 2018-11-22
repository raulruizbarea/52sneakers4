import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './user';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  sdkDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDb = fb.database();
  }

  findAllUsers(): Observable<User[]> {
    return this.db.list('users').valueChanges().pipe(
      tap(console.log),
      map(User.fromJsonList)
    );
  }

  createNewUser(user: any): Observable<any> {
    const userToSave = Object.assign({}, user);
    const newUserKey = this.sdkDb.ref().child('users').push().key;
    const dataToSave = {};

    dataToSave['users/' + newUserKey] = userToSave;

    return this.firebaseUpdate(dataToSave);
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
