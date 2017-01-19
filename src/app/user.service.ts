import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';

import { User } from './user';
import { Address } from './address';

@Injectable()
export class UserService {

  constructor(private af:AngularFire) { }

  createUser(user: User): firebase.Promise<void> {
    let userNode = {[user['uid']]:{"email":user['email'],"mode":user['mode']}};
    console.log(userNode);
    return this.af.database.object('/users').update(userNode);
  }

  updateUserProfile(user: User): firebase.Promise<void> {
    let userNode = {"displayName":user['displayName']};
    return this.af.database.object('/users/'+user['uid']).update(userNode);
  }

  getUserProfile(uid: string): FirebaseObjectObservable<any> {
    return this.af.database.object('/users/'+uid);
  }

  getUserName(uid: string): Observable<any> {
    return this.af.database.object('/users/'+uid).take(1);
  }

  addAddress(uid: string, address: Address): firebase.Promise<void> {
    return this.af.database.list('/users/'+uid+'/addresses').push(address);
  }

  deleteAddress(uid: string, addressKey: string): firebase.Promise<void> {
    return this.af.database.list('/users/'+uid+'/addresses').remove(addressKey);
  }

}
