import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { AuthAdminService } from '../../../core/services/authAdmin.service';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService : AuthService,
    private adminService : AuthAdminService
  ) { }

  ngOnInit() {
  }

  login(form : NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signIn(email, password);
  }


}
