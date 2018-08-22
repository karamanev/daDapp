import { Component, OnInit } from '@angular/core';
import { NewsCreate } from '../../../core/models/news-create.model';
import { NewsService } from '../../../core/services/news-list.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { blockchainExplorer } from '../../../core/blockchain api/contract-service';
import { blockchainNews } from '../../../core/models/blockchain-create.model';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  bindingModel: NewsCreate;
  name: string

  constructor(
    private newsService: NewsService,
    private explorer: blockchainExplorer,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.name = sessionStorage.getItem('name')
    let date = new Date()
    if (this.name !== undefined) {
      this.bindingModel = new NewsCreate("", "", "", this.name, date, "")
    }
    else {
      this.bindingModel = new NewsCreate("", "", "", "", date, "")
    }
  }


  ngOnInit() {
  }

  create() {
    this.newsService.createNews(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Новината e публикувана.', 'Готово');
        this.router.navigate(['/news/all']);
        this.explorer.addCurrentNews(new blockchainNews(this.bindingModel.title, this.bindingModel.summary, this.bindingModel.category, this.bindingModel.publisher))
          .then(a => this.toastr.success('Новината e в блокчейна.', 'Готово'))
          .catch(err => this.toastr.error(err, 'Грешка!'))
      })
  }

}
