import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { SignModel } from '../../../core/models/sign.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  model: SignModel
  constructor(public authService : AuthService) {
    this.model = new SignModel('', '')
   }

  ngOnInit() {
  }

  register() {
    this.authService.signUp(this.model);
  }

}
