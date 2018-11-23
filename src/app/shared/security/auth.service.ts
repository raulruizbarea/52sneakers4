import { Injectable } from '@angular/core';
import { AuthInfo } from './auth-info';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);


  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  login(email, password): Observable<AuthInfo> {
    return this.fromFirebaseAuthPromise(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email, password) {
      return this.fromFirebaseAuthPromise(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();

    promise
        .then(res => {
                const authInfo = new AuthInfo(this.afAuth.auth.currentUser.uid);
                this.authInfo$.next(authInfo);
                subject.next(res);
                subject.complete();
            },
            err => {
                this.authInfo$.error(err);
                subject.error(err);
                subject.complete();
            });

    return subject.asObservable();
  }
  
  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then(() => console.log("Email sent"))
      .catch((error) => console.log(error))
  }

  logout() {
    this.afAuth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);
  }
}
