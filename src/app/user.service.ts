import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { User } from './user';
import { Address } from './address';

@Injectable()
export class UserService {

  constructor(private af:AngularFire) { }

  createUser(user: User): firebase.Promise<void> {
    let userNode = {[user['uid']]:{"email":user['email']}};
    return this.af.database.object('/users').update(userNode);
  }

  updateUserProfile(user: User): firebase.Promise<void> {
    let userNode = {"displayName":user['displayName']};
    return this.af.database.object('/users/'+user['uid']).update(userNode);
  }

  getUserProfile(uid: string): FirebaseObjectObservable<any> {
    return this.af.database.object('/users/'+uid);
  }

  addAddress(uid: string, address: Address): firebase.Promise<void> {
    return this.af.database.list('/users/'+uid+'/addresses').push(address);
  }

}
