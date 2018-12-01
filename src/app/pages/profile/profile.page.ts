import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/security/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/shared/model/user';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: User;
  completeName: string;
  favourites: string;
  disconnect: string;
  subscription: string;
  contact: string;
  history: string;
  notification: string;

  constructor(private authService: AuthService, private usersService: UsersService, private afAuth: AngularFireAuth) {
    this.favourites = Constants.Favourites;
    this.disconnect = Constants.Disconnect;
    this.subscription = Constants.Subscription;
    this.contact = Constants.Contact;
    this.history = Constants.History;
    this.notification = Constants.Notifications;
   }

  ngOnInit() {
    this.usersService.findUserById(this.afAuth.auth.currentUser.uid)
      .subscribe(
        value => {
          this.user = value;
          this.completeName = this.user.name + ' ' + this.user.surnames;
        },
        err => console.log(`Error finding user ${err}`));
  }

  logout() {
    this.authService.logout();
  }
}
