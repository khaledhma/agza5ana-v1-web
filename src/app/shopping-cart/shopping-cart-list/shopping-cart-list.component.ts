import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingListService } from '../shopping-list.service';
import { AuthenticationService } from '../../authentication.service';
import { ShoppingItem } from '../shopping-item';


@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styles: []
})
export class ShoppingCartListComponent implements OnInit {

  private shoppingList: ShoppingItem[] = [];
  private user: any;

  constructor(private shoppingListService: ShoppingListService, private router: Router, private authService: AuthenticationService) { }

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

  removeItem(item) {
    this.shoppingListService.removeItem(item,this.user['uid']);
  }

  decrement(item) {
    this.shoppingListService.decrementItem(item,this.user['uid']);
  }

  increment(item) {
    this.shoppingListService.incrementItem(item,this.user['uid']);
  }

  checkout() {
    this.router.navigate(['shoppinglist','checkout']);
  }

  getTotal(): number {
    let total = 0;
    for(let i=0; i<this.shoppingListService.getCurrentItemsCount(); i++) {
      total = total + this.shoppingList[i]['medecineQty']*this.shoppingList[i]['medecinePrice'];
    }
    return total;
  }


}
