import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { Address } from '../address';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styles: []
})
export class UserProfileComponent implements OnInit {

  private userInfo: User;
  private isAddress: boolean = true;
  private addresses: Address[];


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


  getuserInfo(uid: string) {
    this.userService.getUserProfile(uid).subscribe(
      (userData) => {
        console.log(userData);
        this.userInfo = new User(
          userData.displayName,
          userData.email,
          userData.$key,
          null,
          userData.addresses ? userData.addresses : null
        );
        if (userData.addresses) {
          this.addresses = Object.keys(userData.addresses).map(key=>userData.addresses[key]);
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
        console.log(data);
        this.getuserInfo(this.userInfo['uid']);
        f.reset();
      }
    )
  }

}
