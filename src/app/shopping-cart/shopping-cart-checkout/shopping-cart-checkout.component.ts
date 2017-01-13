import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { ShoppingItem } from '../shopping-item';
import { ShoppingListService } from '../shopping-list.service';
import { AuthenticationService } from '../../authentication.service';


@Component({
  selector: 'app-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html',
  styles: []
})
export class ShoppingCartCheckoutComponent implements OnInit {

  private addresses: any[] = [{ 'name': 'work', 'details': '128, nasr city, cairo' },
    { 'name': 'home 1', 'details': '3, sheraton, cairo' }];

  private shoppingList: ShoppingItem[] = [];
  private user: any;
  private addressSelected: number = 0;

  constructor(private router: Router, private shoppingListService: ShoppingListService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (user) => {
        if (user) {
          this.shoppingList = this.shoppingListService.getList(user.uid);
          this.user = user;
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  getTotal(): number {
    let total = 0;
    for (let i = 0; i < this.shoppingListService.getCurrentItemsCount(); i++) {
      total = total + this.shoppingList[i]['medecineQty'] * this.shoppingList[i]['medecinePrice'];
    }
    return total;
  }

  sendOrder(f:NgForm) {
    console.log(f);
  }

}
