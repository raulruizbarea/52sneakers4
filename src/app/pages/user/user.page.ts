import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'src/app/shared/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user: User;

  constructor(private usersService: UsersService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.usersService.findUserById(this.afAuth.auth.currentUser.uid)
      .subscribe(
        value => {
          // console.log(value);
          this.user = value;
        },
        err => console.log(`Error finding user ${err}`));
  }

}
