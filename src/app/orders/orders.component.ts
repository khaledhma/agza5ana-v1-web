import { Component, OnInit, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit, OnDestroy {

  private orderList: Order[] = [];
  private colapse: boolean[] =[];
  private loading: boolean = true;
  private orderSubscription: Subscription;

  constructor(private orderService: OrderService, private renderer: Renderer, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (user) => {
        if (user) {
          this.orderSubscription = this.orderService.getOrders(user.uid).subscribe(
            (data) =>
            {
              this.loading = false;
              this.orderList = data.reverse();
              for(let i=0; i < this.orderList.length; i++) {
                this.colapse.push(true);
              }
            },
            (error) => console.log(error)
          )
        } else {
          this.router.navigate(['/']);
        }
      }
    )
  }

  ngOnDestroy() {
    this.orderSubscription.unsubscribe();
  }

  showDetails(collapseable: ElementRef, i: number) {
    this.colapse[i]=!this.colapse[i];
    this.renderer.setElementClass(collapseable,'collapse',this.colapse[i]);
  }

}
