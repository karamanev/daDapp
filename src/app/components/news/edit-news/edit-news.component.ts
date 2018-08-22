import { Component, OnInit } from '@angular/core';
import { NewsCreate } from '../../../core/models/news-create.model';
import { NewsService } from '../../../core/services/news-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class EditNewsComponent implements OnInit {

  id: string;
  bindingModel: NewsCreate;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.newsService.getById(this.id)
      .subscribe((data) => {
        this.bindingModel = data;
      })
  }

  edit() {
    const body = {
      [this.id]: this.bindingModel
    }
    this.newsService.editNews(body)
      .subscribe((data) => {
        this.toastr.success('Новината е променена!', 'Готово');
        this.router.navigate(['/news/all']);
      })
  }
}
