import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { AllNewsComponent } from './all-news/all-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { SingleNewsComponent } from './single-news/single-news.component'
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsRoutingModule } from './news-routing.module';
import { EditNewsComponent } from './edit-news/edit-news.component'
import { NgxPaginationModule } from 'ngx-pagination';
import { SortNews } from '../../core/pipes/sorting-pipe';
import { NewsAdminComponent } from '../admin/news-admin/news-admin.component'
import { AdminCategoriesComponent } from '../admin/admin-categories/admin-categories.component'
import { AdminUsersComponent } from '../admin/admin-users/admin-users.component';
import { SearchNewsComponent } from './search-news/search-news.component';
import { NewsCategoryComponent } from './news-category/news-category.component'

@NgModule({
    declarations: [
        AllNewsComponent,
        CreateNewsComponent,
        SingleNewsComponent,
        NewsCategoriesComponent,
        NewsAdminComponent,
        EditNewsComponent,
        AdminCategoriesComponent,
        AdminUsersComponent,
        SortNews,
        SearchNewsComponent,
        NewsCategoryComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NewsRoutingModule,
        NgxPaginationModule
    ]
})
export class NewsModule { }