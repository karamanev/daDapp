import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SignModel } from '../../../core/models/sign.model'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  model: SignModel
  constructor(public authService: AuthService) {
    this.model = new SignModel('', '')
  }

  ngOnInit() {
  }

  login() {
    this.authService.signIn(this.model)
  }
}
