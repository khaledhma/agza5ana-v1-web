import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Order } from './order';

@Injectable()
export class OrderService {

  constructor(private af: AngularFire) { }

  sendOrder(order: Order): firebase.Promise<void> {
    return this.af.database.list('/orders').push(order);
  }

  GetOrders(): FirebaseListObservable<any> {
    return this.af.database.list('/orders', {
    query: {
      limitToFirst: 6,
      orderByKey: true
    }
    });
  }

}
