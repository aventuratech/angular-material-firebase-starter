import { Injectable } from '@angular/core';

import { auth } from 'firebase/app';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {FirebaseService} from '../firebase/firebase.service';

export interface UserAuthInstance {
  displayName?: string;
  email: string;
  emailVerified: boolean;
  phoneNumber?: string;
  photoUrl?: string;
  uid: string;
}
export interface UserAuthResponse {
  credential?: UserAuthCredential;
  user: any;
}

export interface UserAuthCredential {
  accessToken?: string;
}

export const EDUCATIO_USER_SESSION = 'educatio_user_session';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public current: BehaviorSubject<UserAuthInstance> = new BehaviorSubject(null);
  public staticUser;
  private profiles = {};

  get auth() {
    return this.firebase.auth();
  }

  constructor(private firebase: FirebaseService) {
    // load the user from the session
    this.loadSession();

    // watch firebase auth
    this.watchFirebase();
  }

  googleSignIn(popup: boolean): Observable<any> {
    const subject = new Subject();
    const provider = new auth.GoogleAuthProvider();
    this.auth.signInWithPopup(provider).then((res: any) => {
      const token = res.credential.accessToken;
      const {displayName, email, emailVerified, phoneNumber, photoUrl, uid} = res.user;
      const user: UserAuthInstance = {displayName, email, emailVerified, phoneNumber, photoUrl, uid};
      this.setSession(user);
      subject.next(user);
    });
    return subject;
  }

  signOut() {
    const subject = new Subject();
    this.auth.signOut().then(() => subject.next(true));
    return subject;
  }

  watchFirebase() {
    this.auth.onAuthStateChanged((user: any) => {
      if (user) {
        const {displayName, email, photoURL, uid} = user;
        this.setSession({displayName, email, photoURL, uid});
      } else {
        this.destroySession();
      }
    });
  }

  setSession(user) {
    sessionStorage.setItem(EDUCATIO_USER_SESSION, JSON.stringify(user));
    this.current.next(user);
    const {displayName, photoURL, uid} = user;
    const props: any = {};
    if (displayName) {
      props.displayName = displayName;
    }
    if (photoURL) {
      props.photoURL = photoURL;
    }
    this.setProps(uid, props)
    this.staticUser = user;
  }

  loadSession() {
    const session = sessionStorage.getItem(EDUCATIO_USER_SESSION);
    if (session) {
      this.current.next(JSON.parse(session));
    }
  }

  destroySession() {
    this.current.next(null);
    sessionStorage.removeItem(EDUCATIO_USER_SESSION);
  }

  setProps(uid, props: any) {
    this.firebase.firestore().collection('user_props').doc(uid).set(props);
  }

  getProps(uid) {
    const subject = new Subject();
    this.firebase.firestore().collection('user_props').doc(uid).get().then(res => {
      subject.next(res.data());
    });
    return subject;
  }
}
