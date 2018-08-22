import { Injectable } from '@angular/core';
import { CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService : AuthService,
    private router : Router,
    private toastr: ToastrService
  ) {
    
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.check();
  }
  
  check() : boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.toastr.error('Влезте в профилa си!', 'Грешка');
    this.router.navigate(['/auth/signin']);
    return false;
  }
}
