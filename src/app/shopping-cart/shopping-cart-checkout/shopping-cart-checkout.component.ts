import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ShoppingItem } from '../shopping-item';
import { ShoppingListService } from '../shopping-list.service';


@Component({
  selector: 'app-shopping-cart-checkout',
  templateUrl: './shopping-cart-checkout.component.html',
  styles: []
})
export class ShoppingCartCheckoutComponent implements OnInit {

  private addresses: any[] = [{'name':'work','details':'128, nasr city, cairo'},
                              {'name':'home 1','details':'3, sheraton, cairo'}];
  private shoppingList: ShoppingItem[] = [];

  constructor(private router: Router, private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingList = this.shoppingListService.getFinalList();
    console.log(this.shoppingList);
   }


}
