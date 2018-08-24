import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { homeAnimations } from './home.animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: homeAnimations
})
export class HomeComponent implements OnInit {
  state = ['hide', 'hide', 'hide', 'hide', 'hide', 'hide']

  constructor(private authService: AuthService,
  ) { }

  ngOnInit() {
  }

  onAnimate() {
    this.state[0] == "hide"
      ? this.state[0] = "show"
      : this.state[0] = "hide"
  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.pageYOffset

    console.log(scrollPosition)

    if (scrollPosition >= 100) {
      this.state[1] = 'show'
    } else {
      this.state[1] = 'hide'
    }

    if (scrollPosition >= 1200) {
      this.state[2] = 'show'
    } else {
      this.state[2] = 'hide'
    }
    if (scrollPosition >= 1400) {
      this.state[3] = 'show'
    } else {
      this.state[3] = 'hide'
    }
    if (scrollPosition >= 1500) {
      this.state[4] = 'show'
    } else {
      this.state[4] = 'hide'
    }
  }
}