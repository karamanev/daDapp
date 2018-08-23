import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { appAnimations } from './app.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: appAnimations
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService,
  private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
  search(){
    this.router.navigate(['/news/search']);
  }
}
