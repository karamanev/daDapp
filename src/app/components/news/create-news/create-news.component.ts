import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../core/services/category.service';
import { NewsCreate } from '../../../core/models/news-create.model';
import { NewsService } from '../../../core/services/news.service';
import { blockchainExplorer } from '../../../core/blockchain api/contract-service';

import { blockchainNews } from '../../../core/models/blockchain-create.model';
import { CategoryList } from '../../../core/models/category-list.model';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  bindingModel: NewsCreate
  name: string
  categories : Observable<CategoryList[]>

  constructor(
    private newsService: NewsService,
    private explorer: blockchainExplorer,
    private toastr: ToastrService,
    private router: Router,
    private service: CategoriesService,
  ) {
    this.name = sessionStorage.getItem('name')
    let date = new Date()
      this.bindingModel = new NewsCreate("", "", "", this.name, date, "")
  }


  ngOnInit() {
    this.categories = this.service.getAllCategories()
  }

  create() {
    this.newsService.createNews(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Новината e публикувана.', 'Готово');
        this.router.navigate(['/news/all']);
        this.explorer.addCurrentNews(new blockchainNews(this.bindingModel.title, this.bindingModel.summary, this.bindingModel.category, this.bindingModel.publisher))
          .then(a => this.toastr.success('Новината e в блокчейна.', 'Готово и тук:'))
          .catch(err => this.toastr.error(err, 'Грешка!'))
      })
  }

}
