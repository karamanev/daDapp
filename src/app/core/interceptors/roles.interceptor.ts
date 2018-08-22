import {
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as _ from 'lodash'

@Injectable()
export class RolesInterceptor implements HttpInterceptor {
  userRoles: Array<string>
  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {

    const token = this.authService.getToken();
    if (token) {
      this.authService.user.pipe(map(user => {
        this.userRoles = _.keys(_.get(user, 'roles'))
        this.userRoles = this.userRoles.filter(Boolean)

        for (let rol of this.userRoles) {
         
          if (this.userRoles[rol] === true)
          console.log(this.userRoles[rol])
         
            sessionStorage.setItem(rol, "true")
        }
        if (this.userRoles.indexOf('admin') === -1) {
          sessionStorage.removeItem('admin')
        }
        if (this.userRoles.indexOf('notBanned') === -1) {
          sessionStorage.removeItem('notBanned')
        }
      })).subscribe()
    }

    return next.handle(req);
  }
}