import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  home: string;
  news: string;
  profile: string;
  cart: string;

  constructor() {
    this.home = Constants.Home;
    this.news = Constants.News;
    this.profile = Constants.Profile;
    this.cart = Constants.Cart;
  }

  ngOnInit() {
  }

}
