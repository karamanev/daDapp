import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { auth } from 'firebase/app';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import {User} from '../models/user'


import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class AuthAdminService {
    user: Observable<User>;

    constructor(private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore, private toastr: ToastrService,) {
        this.user = this.afAuth.authState.pipe(switchMap(user => {
            if (user) {
                return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
            } else {
                return of(null);
            }
        }));
    }

    googleLogin() {
        const provider = new auth.GoogleAuthProvider();
        return this.oAuthLogin(provider);
    }


    oAuthLogin(provider) {
        return this.afAuth.auth.signInWithPopup(provider).then((credential) => {
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
            roles: {reader: true }
        };

        return userRef.set(data, { merge: true });
    }


    
}