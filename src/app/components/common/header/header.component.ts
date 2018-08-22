import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { appAnimations } from './app.animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: appAnimations
})
export class HeaderComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout();
  }
}
