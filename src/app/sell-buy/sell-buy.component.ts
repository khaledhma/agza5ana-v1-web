import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { SellBuyService } from '../sell-buy.service';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sell-buy',
  templateUrl: './sell-buy.component.html',
  styles: []
})
export class SellBuyComponent implements OnInit, OnDestroy {
  private posts:any[];
  private subscription: Subscription;
  private isLogged: boolean = false;
  private loggedInUser: User = null;
  private userName: string = "";
  private uid: string = "";
  private loading: boolean = true;
  private uploadedImageUrl: string = "";
  private uploadedImageFullPath: string = "";
  private showImage: boolean = false;
  private progressBar: number = 0;
  private showProgressBar: boolean = false;
  private inputField: any;
  private postType: string = "sell";

  constructor(private sellBuyService: SellBuyService, private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (isLogged) => {
        this.isLogged = isLogged;
        if (isLogged) {
          this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
          this.userName = this.loggedInUser['displayName'];
          this.uid = this.loggedInUser['uid'];
          this.postType = "sell";
        } else {
          this.loggedInUser = null;
          this.userName = "";
          this.uid = "";
          this.postType = "sell";
        }
      },
      (error) => console.log(error)
    );

    this.subscription = this.sellBuyService.getAll().subscribe(
      (posts) => {
        this.loading = false;
        this.posts = posts.reverse();
        console.log(this.posts);
      },
      (error) => console.log(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  post(f: NgForm) {
    let post = f.value;
    post.photoUrl = this.uploadedImageUrl?this.uploadedImageUrl:"";
    post.userName = this.userName;
    post.total = +f.value.qty*+f.value.price;
    this.sellBuyService.post(post).then();
    f.reset();
    this.postType = "sell";
  }

  fileChange(event) {
    this.inputField = event;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.showProgressBar = true;
      let emitProgress = new EventEmitter<number>();
      let emitImageData = new EventEmitter<[string]>();
      let subscriber = emitProgress.subscribe((value) => this.progressBar = value);
      let imageSubscriber = emitImageData.subscribe(
        (value) => {
          this.uploadedImageUrl = value[0];
          this.uploadedImageFullPath = value[1];
          this.showImage = true;
          this.showProgressBar = false;
        }
      );
      let file: File = fileList[0];
      let uploadTask = this.sellBuyService.uploadImage(file.name, file);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          emitProgress.emit(progress);
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
          switch (error['code']) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;


            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, function() {
          // Upload completed successfully, now we can get the download URL
          console.log(uploadTask.snapshot.ref.fullPath);
          emitImageData.emit([uploadTask.snapshot.downloadURL, uploadTask.snapshot.ref.fullPath]);
        });
    }
  }

  deleteImage() {
    this.sellBuyService.deleteImage(this.uploadedImageFullPath).then(
      () => {
        this.showImage = false;
        this.uploadedImageUrl = "";
        this.inputField.srcElement.value = '';
      }
    ).catch(console.error);
  }

}
