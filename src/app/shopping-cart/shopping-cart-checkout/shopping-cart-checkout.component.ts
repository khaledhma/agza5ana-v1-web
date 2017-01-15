import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
export class ShoppingCartCheckoutComponent implements OnInit {

  private shoppingList: ShoppingItem[] = [];
  private user: any;
  private addressSelected: number = 0;
  private userInfo: User;
  private isAddress: boolean = true;
  private addresses: Address[] = [];
  private addressesKeys: string[];
  private sending: boolean = false;

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

  getuserInfo(uid: string) {
    this.userService.getUserProfile(uid).subscribe(
      (userData) => {
        this.userInfo = new User(
          userData.displayName,
          userData.email,
          userData.$key,
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

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.shoppingListService.getCurrentItemsCount(); i++) {
      total = total + this.shoppingList[i]['medecineQty'] * this.shoppingList[i]['medecinePrice'];
    }
    return total;
  }

  saveAddress(f: NgForm) {
    let formValue = f['value'];
    if(formValue.hasOwnProperty('addressName')) {
      formValue['addressName'] = null;
    }
    this.userService.addAddress(this.userInfo['uid'], Object.assign(formValue, { 'coordinates': { 'lang': 'lang', 'lat': 'lat' } })).then(
      (data) => {
        this.getuserInfo(this.userInfo['uid']);
        f.reset();
      }
    )
  }

  sendOrder(f:NgForm) {
    this.sending = true;
    if (this.addressSelected == this.addresses.length) {
      this.saveAddress(f);
    }
    let order = new Order(this.user.uid, this.addresses[this.addressSelected], new Date().getTime() , undefined, undefined, undefined, this.shoppingList , this.getTotal());
    this.orderService.sendOrder(order).then(
      (data)=>{
        this.sending = false;
        this.shoppingListService.deleteList(this.user.uid);
        this .router.navigate(['orders']);
      }
    )
  }

}
