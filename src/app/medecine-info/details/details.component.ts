import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { Observable, Subscription} from 'rxjs/Rx';

import { MedecineService } from '../../medecine.service';
import { AuthenticationService } from '../../authentication.service';
import { ShoppingListService } from '../../shopping-cart/shopping-list.service';
import { ShoppingItem } from '../../shopping-cart/shopping-item';
import { User } from '../../user';
import { UserService } from '../../user.service';




@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styles: []
})
export class DetailsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() medecineId = 0;
  private medecineDetails: any;
  @Input() exist: boolean = false;
  private subscription: Subscription;
  private loggedin: boolean = false;
  private loggedInUser: User;



  constructor(private medecineService: MedecineService, private authService: AuthenticationService, private shoppingListService: ShoppingListService, private userService: UserService) {
  }

  ngOnChanges() {

    this.medecineService.getMedecineDetails(this.medecineId).subscribe(
      (data) => {
        this.medecineDetails = data[0];
      },
      (error) => {
        console.error(error);
      }
    )
  }

  ngOnInit() {
    this.subscription = this.authService.isAuthenticated().subscribe(
      (isLogged) => {
        this.loggedin = isLogged;
        if (isLogged) {
          this.loggedInUser = this.userService.getUserProfileFromLocalStorage();
        }
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addItem() {
    let item: ShoppingItem = new ShoppingItem(this.medecineDetails.name_med,
      +this.medecineDetails.$key,
      +this.medecineDetails.price,
      +1,
      "http://lorempixel.com/550/350/");
    this.shoppingListService.addItem(item, this.loggedInUser['uid']);
  }

}
