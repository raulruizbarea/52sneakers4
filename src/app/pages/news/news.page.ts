import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/model/news.service';
import { News } from 'src/app/shared/model/news';
import { tap, map } from 'rxjs/operators';
import { Constants } from 'src/app/constants/app.constants';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  allNews: News[];
  readMore: string;

  constructor(private newsService: NewsService) {
    this.readMore = Constants.ReadMore;
  }

  ngOnInit() {
    console.log('ngOnInit NewsPage');
    this.newsService.findAllNews().pipe(
      tap(console.log))
      .pipe(
        map(news => news.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
      .subscribe(
          news => {
            this.allNews = news;
          });
  }
}
