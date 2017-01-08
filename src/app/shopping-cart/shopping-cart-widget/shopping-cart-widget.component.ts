import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-cart-widget',
  templateUrl: './shopping-cart-widget.component.html',
  styleUrls: ['./shopping-cart-widget.component.scss']
})
export class ShoppingCartWidgetComponent implements OnInit {

  private itemCount: number = 0;
  private subscription: Subscription;
  private isShown = false;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.ItemsCount.subscribe(
      (count) => {
        this.itemCount = count;
        if (count === 1) {
          this.isShown = true;
        }
        if (count === 0) {
          this.isShown = false;
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
