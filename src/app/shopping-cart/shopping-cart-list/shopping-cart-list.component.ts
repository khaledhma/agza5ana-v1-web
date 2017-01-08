import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingListService } from '../shopping-list.service';
import { ShoppingItem } from '../shopping-item';


@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styles: []
})
export class ShoppingCartListComponent implements OnInit {

  private shoppingList: ShoppingItem[] = [];

  constructor(private shoppingListService: ShoppingListService, private router: Router) { }

  ngOnInit() {
    this.shoppingList = this.shoppingListService.getList();
  }

  removeItem(item) {
    this.shoppingListService.removeItem(item);
  }

  decrement(item) {
    this.shoppingListService.decrementItem(item);
  }

  increment(item) {
    this.shoppingListService.incrementItem(item);
  }

  checkout(){
    this.shoppingListService.storeFinalList(this.shoppingList);
    this.router.navigate(['shoppinglist','checkout']);
  }


}
