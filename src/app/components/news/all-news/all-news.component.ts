import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsList } from '../../../core/models/news-list.model';
import { NewsService } from '../../../core/services/news.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.component.html',
  styleUrls: ['./all-news.component.css']
})
export class AllNewsComponent implements OnInit {

  news : Observable<NewsList[]>
  pageSize: number = 6
  currentPage: number = 1

  constructor(
    private newsService : NewsService
  ) { }

  ngOnInit() {
     this.news = this.newsService
     .getAllNews();
  }

  changePage(page){
    this.currentPage = page
  }

}
