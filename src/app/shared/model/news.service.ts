import { Injectable, Inject } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseApp } from '@angular/fire';
import { News } from './news';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  sdkDb: any;

  constructor(private db: AngularFireDatabase, @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDb = fb.database();
  }

  findAllNews(): Observable<News[]> {
    return this.db.list('news').snapshotChanges().pipe(
      tap(console.log),
      map(changes => {
        return changes.map(c => ({$key: c.payload.key, ...c.payload.val()})); } ),
      map(News.fromJsonList)
    );
  }
}
