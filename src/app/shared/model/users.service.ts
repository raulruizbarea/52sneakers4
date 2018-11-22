import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from './user';
import { Observable, Subject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
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
    return this.db.list('users').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(User.fromJsonList)
    );
  }

  findUserByEmail(email: string): Observable<User> {
    return this.db.list('users', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().pipe(
      // map(changes => changes[0]),
      tap(console.log),
      // filter(changes => changes && changes.length > 0),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(changes => changes[0])
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
