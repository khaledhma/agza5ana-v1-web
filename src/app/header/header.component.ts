import { Component, OnInit, ElementRef, Renderer, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs/Rx';

import { OrderService } from '../order.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {

  private isOpen: boolean = false;
  private subscription: Subscription;
  private loggedin: boolean = false;
  private userName: string;
  private newOrderCount: number = 0;
  private loggedInUser: User;
  private isPharmacy: boolean = false;

  constructor(private renderer: Renderer, private authService: AuthenticationService, private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (isLogged) => {
        this.loggedin = isLogged;
        if (isLogged) {
          this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
          this.userName = this.loggedInUser['displayName'];
          this.isPharmacy = this.loggedInUser['mode'] == 1 ? true : false;
          if (!this.isPharmacy) {
            this.orderService.getOrdersOfUser(this.loggedInUser['uid']).subscribe(
              (data) => {
                let filterData = data.filter((item) => {
                  return item['orderStatus'] == 'pending' ? true : false;
                });
                this.newOrderCount = filterData.length
              },
              (error) => console.log(error)
            )
          }
        } else {
          this.userName = "";
        }
      },
      (error) => console.log('errrrorrrrrrrrrr', error)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggle(elementRef: ElementRef) {
    this.isOpen = !this.isOpen;
    this.renderer.setElementClass(elementRef, 'open', this.isOpen);
  }

  close(elementRef: ElementRef) {
    this.renderer.setElementClass(elementRef, 'open', false);
    this.isOpen = false;
  }

  showLogin() {
    this.authService.showLogin(true);
  }

  signout() {
    this.userService.removeUserProfileFromLocalStorage();
    this.authService.signout();
  }

}
