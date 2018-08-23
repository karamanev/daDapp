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
        this.userRoles = Object.keys(user.roles)
        for (let rol of this.userRoles) {
          if (user.roles[rol] === true){
            sessionStorage.setItem(rol, "true")
          }
        }
        if (user.roles['admin'] === false) {
          sessionStorage.removeItem('admin')
        }
        if (user.roles['notBanned'] === false) {
          sessionStorage.removeItem('notBanned')
        }
      })).subscribe()
    }

    return next.handle(req);
  }
}