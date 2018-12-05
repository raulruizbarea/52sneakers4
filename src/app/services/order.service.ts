import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from '@angular/fire';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { tap, map } from 'rxjs/operators';
import { CartPerUser } from '../shared/model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDb = fb.database();
  }

  addSneakerToCart(sneakerKey: string, userKey: string, data: any) {
    this.db.object('cartPerUser/' + userKey + '/' + sneakerKey)
      .update({ sizes: data, quantity: 1 }).then(() => {
        console.log('cartPerUser created succesfully.');
    },
    err => {
      console.log(`Error creating cartPerUser`);
    });
  }

  deleteSneakerToCart(sneakerKey: string, userKey: string) {
    this.db.object('cartPerUser/' + userKey + '/' + sneakerKey).remove().then(() => {
      console.log('cartPerUser deleted succesfully.');
    },
    err => {
      console.log(`Error deleting cartPerUser`);
    });
  }

  findAllSneakersCartByUserKey(userKey: string): Observable<CartPerUser[]> {
    return this.db.list('cartPerUser/' + userKey).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as CartPerUser;
          data.$key = c.payload.key;
          this.sdkDb.ref('sneakers/' + data.$key).once('value')
            .then(function(snapshot) {
              data.sneaker = snapshot.val();
            });
          return data;
        });
      }),
    );
  }

  countCartByUserKey(userKey: string): Observable<any> {
    return this.db.list('cartPerUser/' + userKey).snapshotChanges();
  }

  incrementCartPerUserSneakerQuantityByUserKey(userKey: string, sneakerKey: string, quantity: number) {
    this.db.object('cartPerUser/' + userKey + '/' + sneakerKey).update({ quantity: quantity }).then(() => {
      console.log('Quantity cartPerUser updated succesfully.');
    },
    err => {
      console.log(`Error updating quantity cartPerUser`);
    });
  }

  decrementCartPerUserSneakerQuantityByUserKey(userKey: string, sneakerKey: string, quantity: number) {
    this.db.object('cartPerUser/' + userKey + '/' + sneakerKey).update({ quantity: quantity }).then(() => {
      console.log('Quantity cartPerUser updated succesfully.');
    },
    err => {
      console.log(`Error updating quantity cartPerUser`);
    });
  }
}
