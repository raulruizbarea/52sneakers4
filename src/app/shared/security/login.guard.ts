import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.afAuth.auth.currentUser !== null) {
      this.router.navigateByUrl('/main/tabs/(home:home)');
          return false;
    }

    this.afAuth.authState
       .take(1)
       .map(user => !!user)
       .do(loggedIn => {
         if (loggedIn) {
           console.log('access granted');
           // this.router.navigate(['/main']);
           this.router.navigateByUrl('/main/tabs/(home:home)');
         }
     }).subscribe(value => {
       if (value) {
          this.router.navigateByUrl('/main/tabs/(home:home)');
          return false;
       } else {
          return true;
       }
     });
     return true;
  }
}
