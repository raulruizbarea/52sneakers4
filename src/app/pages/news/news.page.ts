import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/security/auth.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('ngOnInit NewsPage');
    this.logout();
  }
  logout() {
    this.authService.logout();
  }
}
