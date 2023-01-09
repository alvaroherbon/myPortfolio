import { Component } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-card-list',
  templateUrl: './news-card-list.component.html',
  styleUrls: ['./news-card-list.component.css'],
})
export class NewsCardListComponent {
  news: any;
  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe((data) => {
      this.news = data.articles;
      console.log('news', data);
    });
  }
}
