import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsList } from '../models/news-list.model';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news : Observable<NewsList[]>

  constructor(
    private newsService : NewsService
  ) { }

  ngOnInit() {
     this.news = this.newsService
     .getAllNews();
  }


}
