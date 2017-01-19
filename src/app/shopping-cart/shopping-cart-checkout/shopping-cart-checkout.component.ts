import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { ShoppingItem } from '../shopping-item';
import { ShoppingListService } from '../shopping-list.service';
import { AuthenticationService } from '../../authentication.service';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { Address } from '../../address';
import { Order } from '../../order';
import { OrderService } from '../../order.service';


@Component({
  selector: 'app-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html',
  styles: []
})
export class ShoppingCartCheckoutComponent implements OnInit, OnDestroy {

  private shoppingList: ShoppingItem[] = [];
  private user: any;
  private addressSelected: number = 0;
  private userInfo: User;
  private isAddress: boolean = true;
  private addresses: Address[] = [];
  private addressesKeys: string[];
  private sending: boolean = false;
  private userProfileSubscription: Subscription;
  private progressBar: number = 0;
  private showProgressBar: boolean = false;
  private uploadedImageUrl: string = "";
  private uploadedImageFullPath: string = "";
  private showImage: boolean = false;
  private inputField: any;

  constructor(private router: Router,
    private shoppingListService: ShoppingListService,
    private authService: AuthenticationService,
    private userService: UserService,
    private orderService: OrderService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (user) => {
        if (user) {
          this.shoppingList = this.shoppingListService.getList(user.uid);
          this.user = user;
          this.getuserInfo(user.uid);
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
  }

  getuserInfo(uid: string) {
    this.userProfileSubscription = this.userService.getUserProfile(uid).subscribe(
      (userData) => {
        this.userInfo = new User(
          userData.displayName,
          userData.email,
          userData.$key,
          userData.mode,
          null,
          userData.addresses ? userData.addresses : null
        );
        if (userData.addresses) {
          this.addresses = Object.keys(userData.addresses).map(key => userData.addresses[key]);
          this.addressesKeys = Object.keys(userData.addresses);
          if (this.addresses.length > 0) {
            this.isAddress = false;
          } else {
            this.isAddress = true;
          }
        } else {
          this.isAddress = true;
          this.addresses = [];
        }
      },
      (error) => {
        console.log(error)
      }
    );
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.shoppingListService.getCurrentItemsCount(); i++) {
      total = total + this.shoppingList[i]['medecineQty'] * this.shoppingList[i]['medecinePrice'];
    }
    return total;
  }

  saveAddress(f: NgForm) {
    let formValue = f['value'];
    if (formValue.hasOwnProperty('addressName')) {
      formValue['addressName'] = null;
    }
    this.userService.addAddress(this.userInfo['uid'], Object.assign(formValue, { 'coordinates': { 'lang': 'lang', 'lat': 'lat' } })).then(
      (data) => {
        f.reset();
      }
    )
  }

  sendOrder(f: NgForm) {
    this.sending = true;
    if (this.addressSelected == this.addresses.length) {
      this.saveAddress(f);
    }
    let order = new Order(this.user.uid, this.addresses[this.addressSelected], new Date().getTime(), undefined, undefined, undefined, this.shoppingList, this.getTotal(), this.uploadedImageUrl);
    this.orderService.sendOrder(order).then(
      (data) => {
        this.sending = false;
        this.shoppingListService.deleteList(this.user.uid);
        this.router.navigate(['orders']);
      }
    )
  }

  fileChange(event) {
    this.inputField = event;
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.showProgressBar = true;
      let emitProgress = new EventEmitter<number>();
      let emitImageData = new EventEmitter<[string]>();
      let subscriber = emitProgress.subscribe((value)=>this.progressBar=value);
      let imageSubscriber = emitImageData.subscribe(
        (value)=>
        {
          this.uploadedImageUrl=value[0];
          this.uploadedImageFullPath=value[1];
          this.showImage = true;
          this.showProgressBar = false;
        }
      );
      let file: File = fileList[0];
      let uploadTask = this.orderService.uploadImage(file.name,file);
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
          emitImageData.emit([uploadTask.snapshot.downloadURL,uploadTask.snapshot.ref.fullPath]);
        });
    }
  }

  deleteImage() {
    this.orderService.deleteImage(this.uploadedImageFullPath).then(
      ()=> {
        this.showImage = false;
        this.uploadedImageUrl = "";
        this.inputField.srcElement.value='';
      }
    ).catch(console.error);
  }

}
