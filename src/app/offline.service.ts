import { Injectable, Inject } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseApp  } from 'angularfire2';
import * as firebase from 'firebase';

@Injectable()
export class OfflineService {

  constructor(private af: AngularFire, @Inject(FirebaseApp) private firebaseApp: any) { }
  //
  // isOffline(uid: string) {
  //   // since I can connect from multiple devices or browser tabs, we store each connection instance separately
  //   // any time that connectionsRef's value is null (i.e. has no children) I am offline
  //   let myConnectionsRef = this.af.database.object('users/'+ uid +'/connections');
  //   // stores the timestamp of my last disconnect (the last time I was seen online)
  //   let lastOnlineRef = this.af.database.object('users/'+ uid +'/lastOnline');
  //
  //   let connectedRef = this.af.database.ref('.info/connected');
  //   connectedRef.on('value', function(snap) {
  //     if (snap.val() === true) {
  //       // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
  //       // add this device to my connections list
  //       // this value could contain info about the device or a timestamp too
  //       let con = myConnectionsRef.push(true);
  //
  //       // when I disconnect, remove this device
  //       con.onDisconnect().remove();
  //
  //       // when I disconnect, update the last time I was seen online
  //       lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  //     }
  //   });
  // }

}
