import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NewsList } from '../models/news-list.model';
import { NewsCreate } from '../models/news-create.model';

import { blockchainExplorer } from '../blockchain api/contract-service';



import { AngularFireDatabase } from 'angularfire2/database';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



const baseUrl = 'https://testproj-2089a.firebaseio.com/news/'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(
    private http: HttpClient,
    private explorer: blockchainExplorer,
    private db: AngularFireDatabase
  ) { }

  getAllNews() {
    return this.http.get(`${baseUrl}.json`)
      .pipe(map((res: Response) => {
        const ids = Object.keys(res);
        const news: NewsList[] = [];
        for (const i of ids) {
          news.push(new NewsList(i, res[i].title, res[i].summary, res[i].category, res[i].publisher, res[i].date, res[i].imageUrl));
        }

        return news
      }));
  }

  createNews(body: NewsCreate) {
    return this.http.post(`${baseUrl}.json`, body);
  }

  getById(newsId: string) {
    return this.http.get<NewsList>(`${baseUrl}${newsId}/.json`);
  }

  editNews(body) {
    return this.http.patch(`${baseUrl}.json`, body);
  }

  deleteNews(newsId: string) {
    return this.http.delete(`${baseUrl}${newsId}/.json`);
  }
  getNewsToSearch(start: BehaviorSubject<string>): Observable<any[]> {
    return start.pipe(switchMap(startText => {
      const endText = startText + '\uf8ff';

      console.log(this.db.list('/news'))
      return this.db
        .list('/news', ref =>
          ref
            .orderByChild('title')
            .limitToFirst(9)
            .startAt(startText)
            .endAt(endText)
        )
        .snapshotChanges().pipe(debounceTime(200),
          distinctUntilChanged(),
          map(changes => {
            return changes.map(c => {
              return { key: c.payload.key, ...c.payload.val() };
            })
          })

        )
    }))
  }
}