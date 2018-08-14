import { Component, OnInit } from '@angular/core';
import { NewsList } from '../../../core/models/news-list.model';
import { NewsService } from '../../../core/services/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-single-news',
  templateUrl: './single-news.component.html',
  styleUrls: ['./single-news.component.css']
})
export class SingleNewsComponent implements OnInit {
  news : NewsList;
  id : string;

  constructor(    private newsService : NewsService,
    private route : ActivatedRoute,
    private toastr : ToastrService,
    private router : Router) { }


    ngOnInit() {
      this.id = this.route.snapshot.params['id'];
      this.newsService.getById(this.id)
        .subscribe(data => {
          this.news = data;
        })
    }
  
    delete() {
      this.newsService.deleteNews(this.id)
        .subscribe((data) => {
          this.toastr.success('Новината е изтрита.', 'Готово!');
          this.router.navigate(['/news/all']);
        })
    }

}
