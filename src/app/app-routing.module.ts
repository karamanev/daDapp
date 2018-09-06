import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './components/common/home/home.component'
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';

const routes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  {
    path: 'auth', children: [
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
    ]
  },
  {
    path: 'news',
    loadChildren: './components/news/news.module#NewsModule'
  },
  {
    path: 'block',
    loadChildren: './components/blockchain/blockchain.module#BlockchainModule'
  },

  {
    path: '**', redirectTo: '/news/all'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }