import { Component, OnInit } from '@angular/core';
import { NewsList } from '../../../core/models/news-list.model';
import { NewsService } from '../../../core/services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { blockchainExplorer } from '../../../core/blockchain api/contract-service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit {
  news: NewsList
  id: string
  userRoles: string[]
  showButton: boolean
  showTrue: boolean
  showFake: boolean
  rating: string

  constructor(private newsService: NewsService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private explorer: blockchainExplorer,
    private auth: AuthService) { }


  ngOnInit() {
    this.showButton = true
    this.showTrue = false
    this.showFake = false
    this.id = this.route.snapshot.params['id'];
    this.newsService.getById(this.id)
      .subscribe(data => {
        this.news = data;
        this.explorer.getRating(this.news.title).then(res => {
          this.rating = res 
          })
      })
  }

  delete() {
    if (this.auth.isAdmin) {
      this.newsService.deleteNews(this.id)
        .subscribe((data) => {
          this.toastr.success('Новината е изтрита.', 'Готово!');
          this.router.navigate(['/news/all']);
        })
    }
    else {
      this.toastr.error('Единствено администратори могат да изтриват новини.', 'Грешка!');
      this.router.navigate(['/news/all']);
    }
  }

  async showBlockChainStatus() {
    if (await this.explorer.checkNews(this.news)) {
      this.showButton = false
      this.showTrue = true
    }

    else {
      this.showButton = false
      this.showFake = true
    }
  }
}