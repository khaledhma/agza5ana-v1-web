import { Routes } from '@angular/router';

import { MedecineInfoComponent } from './medecine-info/medecine-info.component';
import { OrdersComponent } from './orders/orders.component'
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart-list/shopping-cart-list.component';


export const appRoutes: Routes = [
  { path: '', component: MedecineInfoComponent, pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent },
  { path: 'shoppinglist', component: ShoppingCartListComponent },
  { path: '**', component: MedecineInfoComponent }
];
