import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NewsService } from '../../../core/services/news.service'
import { NewsList } from '../../../core/models/news-list.model'

@Component({
  selector: 'app-search-news',
  templateUrl: './search-news.component.html',
  styleUrls: ['./search-news.component.css']
})
export class SearchNewsComponent implements OnInit {
  news$: Observable<NewsList[]>;
  startAt: BehaviorSubject<string | null> = new BehaviorSubject('');

  constructor(private service: NewsService) { }

  ngOnInit() {
    this.news$ = this.service
      .getNewsToSearch(this.startAt);
  }
  search(searchText) {
    this.startAt.next(searchText);
  }

}

