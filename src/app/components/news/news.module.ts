import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

import { AllNewsComponent } from './all-news/all-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { SingleNewsComponent } from './single-news/single-news.component'
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsAdminComponent } from './news-admin/news-admin.component'
import { NewsRoutingModule } from './news-routing.module'

@NgModule({
    declarations: [
        AllNewsComponent,
        CreateNewsComponent,
        SingleNewsComponent,
        NewsCategoriesComponent,
        NewsAdminComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NewsRoutingModule
    ]
})
export class NewsModule { }