import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Rx';

import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Address } from '../address';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private userInfo: User;
  private isAddress: boolean = true;
  private addresses: Address[];
  private addressesKeys: string[];
  private loading: boolean = true;
  private userProfileSubscription: Subscription;


  constructor(private router: Router, private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (user) => {
        if (user) {
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
        this.loading = false;
        this.userInfo = new User(
          userData.displayName,
          userData.email,
          userData.$key,
          userData.mode,
          null,
          userData.addresses ? userData.addresses : null
        );
        if (userData.addresses) {
          this.addresses = Object.keys(userData.addresses).map(key=>userData.addresses[key]);
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

  saveAddress(f: NgForm) {
    this.userService.addAddress(this.userInfo['uid'], Object.assign(f['value'], { 'coordinates': { 'lang': 'lang', 'lat': 'lat' } })).then(
      (data) => {
        f.reset();
      }
    )
  }

  deleteAddress(i:number) {
    this.userService.deleteAddress(this.userInfo['uid'], this.addressesKeys[i]).then(
      (data)=> { console.log }
    )

  }

}
