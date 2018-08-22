import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AllNewsComponent } from './all-news/all-news.component';
import { CreateNewsComponent } from './create-news/create-news.component';
import { SingleNewsComponent } from './single-news/single-news.component'
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsAdminComponent } from './news-admin/news-admin.component'
import { EditNewsComponent } from './edit-news/edit-news.component';

import { AuthGuard } from '../../core/guards/auth.guard';
import { AdminGuard } from '../../core/guards/admin.guard';

const routes : Route[] = [
    { path: 'all', component: AllNewsComponent },
    { path: 'create', component: CreateNewsComponent, canActivate: [ AuthGuard ] },
    { path: 'details/:id', component: SingleNewsComponent },
    { path: 'categories/:id', component: NewsCategoriesComponent },
    { path: 'edit/:id', component: EditNewsComponent },
    { path: 'admin', component: NewsAdminComponent , canActivate: [ AuthGuard, AdminGuard ]},
  ]
  
  @NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [ RouterModule ]
  })
  export class NewsRoutingModule {}