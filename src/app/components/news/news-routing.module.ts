import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AllNewsComponent } from './all-news/all-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { SingleNewsComponent } from './single-news/single-news.component'
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsAdminComponent } from './news-admin/news-admin.component'

import { AuthGuard } from '../auth/auth.guard';

const routes : Route[] = [
    { path: 'all', component: AllNewsComponent },
    { path: 'create', component: CreateNewsComponent, canActivate: [ AuthGuard ] },
    { path: 'details/:id', component: SingleNewsComponent },
    { path: 'categories/:id', component: NewsCategoriesComponent },
    { path: 'admin', component: NewsAdminComponent , canActivate: [ AuthGuard ]},
  ]
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
  export class NewsRoutingModule {}