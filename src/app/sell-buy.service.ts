import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/take';
import * as firebase from 'firebase';

@Injectable()
export class SellBuyService {

  constructor(private af:AngularFire, @Inject(FirebaseApp)  private firebaseApp:any) { }

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

  uploadImage(filaName: string, file: File): firebase.storage.UploadTask {
    return this.firebaseApp.storage().ref().child('sellBuyPhoto/' + filaName.split(".")[0] + new Date().getTime() + '.' + filaName.split(".")[1]).put(file);
  }

  deleteImage(fileFullPath: string): firebase.Promise<any> {
    console.log('fulllll path',fileFullPath);
    return this.firebaseApp.storage().ref().child(fileFullPath).delete();
  }

}
