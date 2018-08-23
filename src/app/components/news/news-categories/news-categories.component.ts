import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryList } from '../../../core/models/category-list.model';
import { CategoriesService } from '../../../core/services/category.service';

@Component({
  selector: 'app-news-categories',
  templateUrl: './news-categories.component.html',
  styleUrls: ['./news-categories.component.css']
})
export class NewsCategoriesComponent implements OnInit {
  categories : Observable<CategoryList[]>
  constructor(
    private service: CategoriesService
      ) { }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
  }

}
