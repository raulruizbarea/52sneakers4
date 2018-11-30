import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { News } from 'src/app/shared/model/news';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  news: News;

  constructor(private route: ActivatedRoute, private menuCtrl: MenuController, private newsService: NewsService) {
    // console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    console.log('ngOnInit NewsDetailPage');
  }

  ionViewWillEnter() {
    this.newsService.findNewsByKey(this.route.snapshot.paramMap.get('id')).subscribe(
      (news) => {
        this.news = news;
      },
      err => {
        console.log(`Error finding news ${err}`);
      }
    );
  }
}
