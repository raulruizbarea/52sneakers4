import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { News } from 'src/app/shared/model/news';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/shared/model/news.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit, OnDestroy {
  news: News;

  constructor(private route: ActivatedRoute, private menuCtrl: MenuController, private newsService: NewsService) {
    this.menuCtrl.enable(false);
    console.log(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    console.log('ngOnInit NewsDetailPage');
    this.newsService.findNewsByKey(this.route.snapshot.paramMap.get('id')).subscribe(
      (news) => {
        this.news = news;
      },
      err => {
        console.log(`Error finding news ${err}`);
      }
    );
  }

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
