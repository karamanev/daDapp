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
  userRoles: Array<String>
  constructor(
    private authService: AuthService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpEvent<any>> {

    const token = this.authService.getToken();
    if (token) {
      this.authService.user.pipe(map(user => {
        console.log(this.userRoles = _.keys(_.get(user, 'roles')))
        return this.userRoles = _.keys(_.get(user, 'roles'))
      }))
        .subscribe()
    }
  
    return next.handle(req);
  }
}