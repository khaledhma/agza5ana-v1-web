import { Component, OnInit, ElementRef, Renderer, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  private isOpen: boolean = false;
  private subscription: Subscription;
  private loggedin: boolean = false;

  constructor(private renderer: Renderer, private authService:AuthenticationService) { }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (data)=>this.loggedin=data?true:false,
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
