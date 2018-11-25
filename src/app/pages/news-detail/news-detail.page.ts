import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewController } from '@ionic/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit, OnDestroy {

  constructor(private menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    console.log('ngOnInit NewsDetailPage');
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
