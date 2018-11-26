import { Injectable, Inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from '@angular/fire';
import { Subscriptions } from '../shared/model/subscriptions';
import { map, tap, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDb = fb.database();
  }

  findSubscriptionByEmail(email: string): Observable<Subscriptions> {
    return this.db.list('subscriptions', ref => ref.orderByChild('email').equalTo(email)).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(changes => changes[0])
    );
  }

  createNewSubscription(subscription: any): Observable<any> {
    const subscriptionToSave = Object.assign({}, subscription);
    const dataToSave = {};
    const newSubscriptionKey = this.sdkDb.ref().child('subscriptions').push().key;

    dataToSave['subscriptions/' + newSubscriptionKey] = subscriptionToSave;

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
