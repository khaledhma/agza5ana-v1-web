import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp, FirebaseObjectObservable  } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class OfflineService {

  constructor(private af: AngularFire, @Inject(FirebaseApp) private firebaseApp: firebase.app.App) { }

  isOffline(): FirebaseObjectObservable<any> {
    return this.af.database.object('.info/connected');
  }

  saveConnection(uid: string) {
    this.firebaseApp.database().ref('online/').update({ [uid]: true});
    this.firebaseApp.database().ref('online/' + uid).onDisconnect().remove();
  }

}
