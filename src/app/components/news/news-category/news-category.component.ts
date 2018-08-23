import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsList } from '../../../core/models/news-list.model';
import { NewsService } from '../../../core/services/news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-category',
  templateUrl: './news-category.component.html',
  styleUrls: ['./news-category.component.css']
})
export class NewsCategoryComponent implements OnInit {

  category: string
  news : Observable<NewsList[]>
  pageSize: number = 6
  currentPage: number = 1

  constructor(
    private newsService : NewsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     this.category = this.route.snapshot.params['title'];
     this.news = this.newsService.getNewsFromCategory(this.category);
  }

  changePage(page){
    this.currentPage = page
  }

}
