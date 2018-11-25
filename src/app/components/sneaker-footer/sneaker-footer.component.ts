import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthInfo } from 'src/app/shared/security/auth-info';
import { AuthService } from 'src/app/shared/security/auth.service';

@Component({
  selector: 'sneaker-footer',
  templateUrl: './sneaker-footer.component.html',
  styleUrls: ['./sneaker-footer.component.scss']
})
export class SneakerFooterComponent implements OnInit {
  authInfo: AuthInfo;
  footerTitle: string;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.footerTitle = Constants.FooterTitle;
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }

  isLoggedIn() {
    return this.afAuth.auth.currentUser;
  }
}
