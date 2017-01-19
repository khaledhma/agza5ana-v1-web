import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp  } from 'angularfire2';
import * as firebase from 'firebase';

import { Order } from './order';

@Injectable()
export class OrderService {

  constructor(private af: AngularFire, @Inject(FirebaseApp)  private firebaseApp:any) { }

  sendOrder(order: Order): firebase.Promise<void> {
    return this.af.database.list('/orders').push(order);
  }

  getOrders(uid: string): FirebaseListObservable<any> {
    return this.af.database.list('/orders', {
      query: {
        orderByChild: 'orderSenderId',
        equalTo: uid,
        limitToLast: 10
      }
    });
  }

  uploadImage(filaName: string, file: File): firebase.storage.UploadTask {
    return this.firebaseApp.storage().ref().child('orderPhoto/' + filaName.split(".")[0] + new Date().getTime() + '.' + filaName.split(".")[1]).put(file);
  }

  deleteImage(fileFullPath: string): firebase.Promise<any> {
    console.log('fulllll path',fileFullPath);
    return this.firebaseApp.storage().ref().child(fileFullPath).delete();
  }

}
