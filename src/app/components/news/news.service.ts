import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NewsList } from './models/news-list.model';
import { NewsCreate } from './models/news-create.model';
//import { blockchainExplorer } from '../news/blockchain api/contractExplorer'

const baseUrl = 'https://testproj-2089a.firebaseio.com/news/'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  constructor(
    private http : HttpClient,
  //  private explorer: blockchainExplorer
  ) {  }

  getAllNews() {
    return this.http.get(`${baseUrl}.json`)
      .pipe(map((res : Response) => {
        const ids = Object.keys(res);
        const news : NewsList[] = [];
        for (const i of ids) {
          news.push(new NewsList(i, res[i].title, res[i].summary, res[i].category, res[i].publisher, res[i].rating, res[i].imageUrl));
        }

        return news;
      }));
  }

  /*
  getAllNewsFromBlockchain(){
    return this.explorer.showNews()
  }
  */

  createNews(body : NewsCreate) {
    return this.http.post(`${baseUrl}.json`, body);
  }

  getById(newsId : string) {
    return this.http.get<NewsList>(`${baseUrl}${newsId}/.json`);
  }
}
