import { Component, OnInit, ElementRef, Renderer } from '@angular/core';

import { OrderService } from '../order.service';
import { Order } from '../order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  private orderList: Order[] = [];

  constructor(private orderService: OrderService, private renderer: Renderer) { }

  ngOnInit() {
    this.orderService.GetOrders().subscribe(
      (data) => this.orderList = data,
      (error) => console.log(error)
    )
  }

  showDetails(details: ElementRef) {
    this.renderer.setElementStyle(details,'display','block');
  }

}
