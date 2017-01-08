import { Routes } from '@angular/router';

import { MedecineInfoComponent } from './medecine-info/medecine-info.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartCheckoutComponent } from './shopping-cart/shopping-cart-checkout/shopping-cart-checkout.component';
import { UserProfileComponent } from './user-profile/user-profile.component'

export const appRoutes: Routes = [
  { path: '', component: MedecineInfoComponent, pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent },
  { path: 'shoppinglist', component: ShoppingCartListComponent, pathMatch: 'full' },
  { path: 'shoppinglist/checkout', component: ShoppingCartCheckoutComponent },
  { path: 'userprofile', component: UserProfileComponent },
  { path: '**', component: MedecineInfoComponent }
];
