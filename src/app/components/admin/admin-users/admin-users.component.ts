import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  users: Observable<User[]>
  bindingModel: User

  constructor(private toastr: ToastrService,
    private router: Router,
    private auth: AuthService,
  ) {
    this.bindingModel
  }

  ngOnInit() {
    this.users = this.auth.getAllUsers()
  }

  banUser(uid) {

  }



  private get isAdmin(): boolean {
    if (this.auth.isAdmin)
      return true
  }
}
