import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { User } from '../models/user.model'


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: Observable<User>;
  users: Observable<User[]>;
  token: string;
  private usersCollection: AngularFirestoreCollection<User>

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private db: AngularFireDatabase) {

    this.user = this.afAuth.authState.pipe(switchMap(user => {
      if (user) {
        return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    }))

    this.usersCollection = afs.collection<User>('users')    
    this.users = this.usersCollection.valueChanges();
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
        sessionStorage.setItem('name', email)
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
        sessionStorage.setItem('name', credential.user.email)
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
        sessionStorage.clear()
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

  getAllUsers(){



    console.log(this.db.list('/news'),  {
      query: {
        orderByChild: 'title',
        limitToFirst: 10}})

    let users: Observable<User[]>
    let userRef: AngularFirestoreDocument<any> = this.afs.doc('users/users.json');

    var docRef = this.afs.collection('users')
    
    console.log(userRef)
    console.log(docRef)
    console.log(this.usersCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))))
 
    return users
  }

  isAuthenticated(): boolean {
    return this.token != null;
  }

  isAdmin(): boolean {
    if (sessionStorage.getItem('admin'))
      return true
  }

  isAuthorOrAdmin(publisher:string): boolean {
    if (publisher === sessionStorage.getItem('name')){
      return true
    }
    if (sessionStorage.getItem('admin'))
      return true
  }

  isLogged(): boolean{
    if (sessionStorage.getItem('name'))
      return true
  }
  
}