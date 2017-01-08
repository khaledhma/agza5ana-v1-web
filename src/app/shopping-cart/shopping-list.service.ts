import { Injectable, EventEmitter } from '@angular/core';

import { ShoppingItem } from './shopping-item';

@Injectable()
export class ShoppingListService {

  private shoppingList: ShoppingItem[];
  public ItemsCount = new EventEmitter <number>();

  constructor() {
  this.shoppingList = [];
 }

  getItemsCount() {
    this.ItemsCount.emit(this.shoppingList.length);
    console.log("getcount:", this.shoppingList.length);
  };

  addItem (item: ShoppingItem) {
    this.shoppingList.push(item);
    this.getItemsCount();
    console.log("additem:", this.shoppingList);
  };

  removeItem (item: ShoppingItem) {
    this.shoppingList.splice(this.shoppingList.indexOf(item),1);
    this.getItemsCount();
  };

  editItem (newitem: ShoppingItem, olditem: ShoppingItem) {
    this.shoppingList[this.shoppingList.indexOf(olditem)] = newitem;
  };

  incrementItem (item: ShoppingItem) {
    let item2: ShoppingItem = this.shoppingList[this.shoppingList.indexOf(item)];
    item2['medecineQty'] ++;
    this.editItem (item2, item);
  };

  decrementItem (item: ShoppingItem) {
    let item2: ShoppingItem = this.shoppingList[this.shoppingList.indexOf(item)];
    item2['medecineQty'] --;
    this.editItem (item2, item);
  };

  getList ():  ShoppingItem[] {
    console.log("getlist:", this.shoppingList);
    return this.shoppingList;
  };

  deleteList () {
    this.getItemsCount();
    this.shoppingList = [];
  };

}
