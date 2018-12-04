import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FirebaseApp } from '@angular/fire';
import { User } from '../shared/model/user';

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

  findUserById(id: string): Observable<User> {
    return this.db.list('users', ref => ref.orderByKey().equalTo(id)).snapshotChanges().pipe(
      // map(changes => changes[0]),
      tap(console.log),
      // filter(changes => changes && changes.length > 0),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(changes => changes[0])
    );
  }

  createNewUser(uid: string, user: any): Observable<any> {
    const userToSave = Object.assign({}, user, { notifications: false });
    const dataToSave = {};

    dataToSave['users/' + uid] = userToSave;

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

  findNotificationConfigByUser(userKey: string): Observable<boolean> {
    return this.db.list('users/' + userKey, query => query.orderByKey().equalTo('notifications')).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => c.payload.val()); } ),
      map(changes => changes[0])
    );
  }

  updateNotificationConfigByUser(userKey: string, status: boolean) {
    this.db.object('users/' + userKey).update({ notifications: status }).then(() => {
        console.log('Notification of user updated succesfully.');
    },
    err => {
      console.log(`Error changing notification of user`);
    });
  }

  updateUserByUserId(uid: string, user: any): Observable<any> {
    const userToSave = Object.assign({}, user);
    delete(userToSave.$key);

    const dataToSave = {};

    dataToSave['users/' + uid] = userToSave;

    return this.firebaseUpdate(dataToSave);
  }

  updateProfilePhotoByUserId(uid: string, urlImage: string) {
    this.db.object('users/' + uid).update({ urlImage: urlImage }).then(() => {
        console.log('ProfileImage users updated succesfully.');
    },
    err => {
      console.log(`Error updating profileImage users`);
    });
  }
}
