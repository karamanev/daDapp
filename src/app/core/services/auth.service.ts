import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<firebase.User>;
  token: string;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private firebaseAuth: AngularFireAuth) {
      this.user = firebaseAuth.authState;
  }

  signIn(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.firebaseAuth.auth
          .currentUser
          .getIdToken()
          .then((token: string) => {
            this.token = token;
          })

        this.router.navigate(['/recipes/start']);
        this.toastr.success('Успешно влязохте в системата', 'Добре дошли!');
      })
      .catch((err) => {
        this.toastr.error('Има грешка в попълнените данни', 'Внимание!');
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/auth/signin']);
        this.token = null;
      });
  }

  getToken() {
    firebase.auth()
    .currentUser
    .getIdToken()
    .then((token : string) => {
      this.token = token;
    })

    return this.token;
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  signUp(email: string, password: string) {
    this.firebaseAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.toastr.success('Успешно се регистрирахте в приложението!', 'Добре дошли!');
        this.router.navigate(['/auth/signin']);
      })
      .catch((err) => {
        this.toastr.error('Има грешка в попълнените данни', 'Внимание!');
      });
  }
}