import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class SellBuyService {

  constructor(private af:AngularFire) { }

  post(post: any): firebase.Promise<void> {
    return this.af.database.list('/sellbuy').push(post);
  }

  getAll(): FirebaseListObservable<any> {
    return this.af.database.list('/sellbuy', {
      query: {
        orderByKey: true,
        limitToLast: 10
      }
    });
  }

}
