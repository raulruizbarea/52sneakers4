import { Injectable } from '@angular/core';
import { Sneaker } from './sneaker';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {

  constructor(private db: AngularFireDatabase) { }

  findAllSneakers(): Observable<Sneaker[]> {
    return this.db.list('sneakers').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(Sneaker.fromJsonList)
    );
  }
}
