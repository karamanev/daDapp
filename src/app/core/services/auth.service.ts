import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { User } from '../models/user'
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable, BehaviorSubject} from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<User> = new BehaviorSubject(null)

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase) {


      this.afAuth.authState
        .switchMap(auth => {
          if (auth) {
            /// signed in
            return this.db.object('users/' + auth.uid)
          } else {
            /// not signed in
            return Observable.of(null)
          }
        })
        .subscribe(user => {
          this.user.next(user)
        })
    }


    ///// SignIn - SignOut Process /////

    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      return this.afAuth.auth.signInWithPopup(provider)
        .then(credential =>  {
            this.updateUser(credential.user)
        })
    }

    signOut() {
      this.afAuth.auth.signOut()
    }

    //// Update user data ////

    /// updates database with user info after login
    /// only runs if user role is not already defined in database
    private updateUser(authData) {
      const userData = new User(authData)
      const ref = this.db.object('users/' + authData.uid)
      ref.take(1)
         .subscribe(user => {
          if (!user.role) {
            ref.update(userData)
          }
      })

    }
}










  token : string;

  constructor(
    private toastr : ToastrService,
    private router : Router
  ) { }

  signUp(email: string, password : string) {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
      .then((data) => {
        this.toastr.success('Успешно се регистрирахте в приложението!', 'Добре дошли!');
        this.router.navigate(['/auth/signin']);
      })
      .catch((err) => {
        this.toastr.error('Има грешка в попълнените данни', 'Внимание!');
      });
  }

  signIn(email : string, password : string) {
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        firebase.auth()
          .currentUser
          .getIdToken()
          .then((token : string) => {
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
    firebase.auth().signOut()
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

  isAuthenticated() : boolean {
    return this.token != null;
  }
}