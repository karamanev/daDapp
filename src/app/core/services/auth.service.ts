import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user'


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<User>;
  token: string;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore, ) {

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  signIn(email: string, password: string) {
    this.afAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        this.afAuth.auth
          .currentUser
          .getIdToken()
          .then((token: string) => {
            this.token = token;
          })
        this.updateUserData(data.user);
        this.router.navigate(['/recipes/start']);
        this.toastr.success('Успешно влязохте в системата', 'Добре дошли!');
      })
      .catch((err) => {
        this.toastr.error('Има грешка в попълнените данни', 'Внимание!');
      });
  }

  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
      this.afAuth.auth
        .currentUser
        .getIdToken()
        .then((token: string) => {
          this.token = token;
        })
      this.updateUserData(credential.user);
      this.router.navigate(['/recipes/start']);
      this.toastr.success('Успешно влязохте в системата', 'Добре дошли!');
    });
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: { reader: true }
    };

    return userRef.set(data, { merge: true });
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => {
        this.router.navigate(['/auth/signin']);
        this.token = null;
      });
  }

  getToken() {
    if (firebase.auth().currentUser !== null) {
      firebase.auth()
      .currentUser
      .getIdToken()
      .then((token: string) => {
        this.token = token;
      })

      return this.token;
    }
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  signUp(email: string, password: string) {
    this.afAuth.auth
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