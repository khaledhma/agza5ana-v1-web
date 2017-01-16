import { Component, OnInit, ElementRef, Renderer, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs/Rx';

import { OrderService } from '../order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  private isOpen: boolean = false;
  private subscription: Subscription;
  private loggedin: boolean = false;
  private userName: string;
  private newOrderCount: number = 0;

  constructor(private renderer: Renderer, private authService:AuthenticationService, private orderService: OrderService) { }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (data)=>
      {
        this.loggedin=data?true:false;
        if (data) {
          this.userName = data.auth.displayName;
          this.orderService.getOrders(data.uid).subscribe(
            (data)=>
            {
              console.log('getOrders from header',data);
              let filterData = data.filter((item)=>{
                return item['orderStatus']=='pending'?true:false;
              });
              this.newOrderCount=filterData.length
            },
            (error)=>console.log(error)
          )
        } else {
          this.userName = "";
        }

      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  toggle(elementRef: ElementRef) {
    this.isOpen = !this.isOpen;
    this.renderer.setElementClass(elementRef,'open',this.isOpen);
  }

  close(elementRef: ElementRef) {
    this.renderer.setElementClass(elementRef,'open',false);
    this.isOpen = false;
  }

  showLogin() {
    this.authService.showLogin(true);
  }

  signout() {
    this.authService.signout();
  }

}
