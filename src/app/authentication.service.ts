import { Injectable, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseAuthState, AuthProviders, AuthMethods } from 'angularfire2';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthenticationService {

  public openLogin = new EventEmitter<boolean>();

  constructor(private af:AngularFire) { }

  showLogin (value: boolean){
    this.openLogin.emit(value);
  }

  loginUserWithEmailAndPassword (email: string, password: string): firebase.Promise<FirebaseAuthState> {

      return this.af.auth.login({ 'email':email, 'password':password }, {provider: AuthProviders.Password, method: AuthMethods.Password});

  }

  signupUserWithEmailAndPassword (name: string, email: string, password: string): firebase.Promise<FirebaseAuthState> {

      return this.af.auth.createUser({ 'email':email, 'password':password });

  }

  signout () {
    this.af.auth.logout();
  }

  isAuthenticated (): Observable<any> {
    return this.af.auth;
  }

}
