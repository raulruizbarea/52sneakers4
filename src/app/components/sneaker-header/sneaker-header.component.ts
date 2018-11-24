import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';
import { AuthInfo } from 'src/app/shared/security/auth-info';
import { AuthService } from 'src/app/shared/security/auth.service';

@Component({
  selector: 'sneaker-header',
  templateUrl: './sneaker-header.component.html',
  styleUrls: ['./sneaker-header.component.scss'],
})
export class SneakerHeaderComponent implements OnInit {
  appName: string;
  authInfo: AuthInfo;

  constructor(private authService: AuthService) {
    this.appName = Constants.AppName;
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo =>  this.authInfo = authInfo);
  }
}
