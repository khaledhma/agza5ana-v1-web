import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ShoppingListService } from '../shopping-list.service';
import { AuthenticationService } from '../../authentication.service';
import { ShoppingItem } from '../shopping-item';



@Component({
  selector: 'app-shopping-cart-widget',
  templateUrl: './shopping-cart-widget.component.html',
  styleUrls: ['./shopping-cart-widget.component.scss']
})
export class ShoppingCartWidgetComponent implements OnInit {

  private itemCount: number = 0;
  private shoppingList: ShoppingItem[] = [];
  private subscription: Subscription;
  private isShown = false;

  constructor(private shoppingListService: ShoppingListService, private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (user) => {
        if (user) {
          this.shoppingList = this.shoppingListService.getList(user.uid);
          this.itemCount = this.shoppingListService.getCurrentItemsCount();
          if (this.itemCount >= 1) {
            this.isShown = true;
          }
          if (this.itemCount == 0) {
            this.isShown = false;
          }
          this.subscription = this.shoppingListService.ItemsCount.subscribe(
            (count) => {
              this.itemCount = count;
              if (count >= 1) {
                this.isShown = true;
              }
              if (count == 0) {
                this.isShown = false;
              }
            }
          )
        } else {
          this.isShown = false;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
