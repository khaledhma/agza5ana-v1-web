import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  private orderList: Order[] = [];
  private colapse: boolean[] =[];
  private loading: boolean = true;

  constructor(private orderService: OrderService, private renderer: Renderer, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      (user) => {
        if (user) {
          this.orderService.getOrders(user.uid).subscribe(
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

  showDetails(collapseable: ElementRef, i: number) {
    this.colapse[i]=!this.colapse[i];
    this.renderer.setElementClass(collapseable,'collapse',this.colapse[i]);
  }

}
