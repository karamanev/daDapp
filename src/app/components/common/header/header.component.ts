import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],

})
export class HeaderComponent implements OnInit {

  constructor(public authService : AuthService,
  private router: Router) { }
  navbarOpen = false;

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
  search(){
    this.router.navigate(['/news/search']);
  }
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}
