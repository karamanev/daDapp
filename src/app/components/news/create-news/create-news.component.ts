import { Component, OnInit } from '@angular/core';
import { NewsCreate } from '../../../core/models/news-create.model';
import { NewsService } from '../../../core/services/news.service';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {

  bindingModel : NewsCreate;

  constructor(
    private newsService : NewsService,
    private toastr : ToastrService,
    private router : Router
  ) {
    this.bindingModel = new NewsCreate("", "", "","Gosho", 0, "");
  }

  ngOnInit() {
  }

  create() {
    this.newsService.createNews(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Новината и публикувана.', 'Готово');
        this.router.navigate(['/news/all']);
      })
  }

}
