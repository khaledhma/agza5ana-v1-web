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
  private postType: string = "sell";
  private uploadedImageUrl: string = "";

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
}
