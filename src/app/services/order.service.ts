import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from '@angular/fire';
import {Observable, Subject} from 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { tap, map } from 'rxjs/operators';
import { CartPerUser, Order, SneakersPerOrder } from '../shared/model/order';
import { SneakerService } from './sneaker.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  sdkDb: any;
  public storage: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp,
  private sneakerService: SneakerService) {
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

  createNewOrder(userKey: string, order: any, sneakers: any): Observable<any> {
    const orderToSave = Object.assign({}, order);
    const dataToSave = {};
    const newOrderKey = this.sdkDb.ref().child('orders').push().key;

    dataToSave['orders/' + newOrderKey] = orderToSave;

    this.storage = newOrderKey;

    this.createNewOrderPerUser(userKey, newOrderKey, order);

    this.createNewSneakersPerOrder(newOrderKey, sneakers);

    sneakers.forEach(sneaker => {
      console.log(sneaker.$key + ' - ' + sneaker.sneaker.sneakerSold + ' - ' + sneaker.quantity);
      this.sneakerService.updateSold(sneaker.$key, sneaker.sneaker.sneakerSold + sneaker.quantity);
    });

    return this.firebaseUpdate(dataToSave);
  }

  createNewOrderPerUser(userKey: string, orderKey: string, order: any): Observable<any> {
    const orderToSave = Object.assign({}, order);
    const dataToSave = {};

    dataToSave['ordersPerUser/' + userKey + '/' + orderKey] = orderToSave;

    return this.firebaseUpdate(dataToSave);
  }

  createNewSneakersPerOrder(orderKey: string, sneakers: CartPerUser[]): Observable<any> {
    const dataToSave = {};

    sneakers.forEach(sneaker => {
      dataToSave['sneakersPerOrder/' + orderKey + '/' + sneaker.$key] = {
        quantity: sneaker.quantity,
        sizes: sneaker.sizes
      };
    });

    return this.firebaseUpdate(dataToSave);
  }

  deleteCartPerUserId(userKey: string) {
    this.db.object('cartPerUser/' + userKey).remove().then(() => {
      console.log('cartPerUser deleted succesfully.');
    },
    err => {
      console.log(`Error deleting cartPerUser`);
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

  findAllOrdersByUserKey(userKey: string): Observable<Order[]> {
    return this.db.list('ordersPerUser/' + userKey).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as Order;
          data.$key = c.payload.key;
          return data;
        });
      }),
    );
  }

  findAllSneakersByOrderKey(orderKey: string): Observable<SneakersPerOrder[]> {
    return this.db.list('sneakersPerOrder/' + orderKey).snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => {
          const data = c.payload.val() as SneakersPerOrder;
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


  findOrderByOrderKey(orderKey: string): Observable<Order> {
    return this.db.list('orders', ref => ref.orderByKey().equalTo(orderKey)).snapshotChanges().pipe(
      // map(changes => changes[0]),
      tap(console.log),
      // filter(changes => changes && changes.length > 0),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(changes => changes[0])
    );
  }

  updateRated(orderKey: string, userKey: string) {
    this.db.object('orders/' + orderKey).update({ rated: true }).then(() => {
        console.log('Rated orders updated succesfully.');
    },
    err => {
      console.log(`Error updating rated orders`);
    });
    this.db.object('ordersPerUser/' + userKey + '/' + orderKey).update({ rated: true }).then(() => {
      console.log('Rated ordersPerUser updated succesfully.');
    },
    err => {
      console.log(`Error updating rated ordersPerUser`);
    });
  }
}
