import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AuthInfo } from 'src/app/shared/security/auth-info';
import { AuthService } from 'src/app/shared/security/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Input } from '@angular/core';

@Component({
  selector: 'sneaker-header',
  templateUrl: './sneaker-header.component.html',
  styleUrls: ['./sneaker-header.component.scss'],
})
export class SneakerHeaderComponent implements OnInit {
  @Input() appName: string;
  authInfo: AuthInfo;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth) {
    this.appName = Constants.AppName;
  }

  isLoggedIn() {
    return this.afAuth.auth.currentUser;
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }
}
