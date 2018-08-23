import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../../../core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CategoryList } from '../../../core/models/category-list.model';
import { CategoryCreate } from '../../../core/models/category-create.model';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories: Observable<CategoryList[]>
  bindingModel: CategoryCreate
  deleteModel: CategoryList

  constructor(    private service: CategoriesService,
    private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,) { 
      this.bindingModel = new CategoryCreate("")
    }

  ngOnInit() {
    this.categories = this.service.getAllCategories()
  }

  delete(id) {
    if (this.isAdmin) {
      this.service.deleteCategory(id)
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

  create() {
    this.service.createCategory(
      this.bindingModel)
      .subscribe(() => {
        this.toastr.success('Рубриката e добавена.', 'Готово');
        this.router.navigate(['/news/all'])

      })
  }

  private get isAdmin(): boolean {
    if (this.auth.isAdmin)
      return true
  }
}
