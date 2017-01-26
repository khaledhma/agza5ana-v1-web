import { Routes } from '@angular/router';

import { MedecineInfoComponent } from './medecine-info/medecine-info.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingCartListComponent } from './shopping-cart/shopping-cart-list/shopping-cart-list.component';
import { ShoppingCartCheckoutComponent } from './shopping-cart/shopping-cart-checkout/shopping-cart-checkout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './auth-guard';
import { PharmacyOrderComponent } from './pharmacy-order/pharmacy-order.component';
import { SellBuyComponent } from './sell-buy/sell-buy.component';

export const appRoutes: Routes = [
  { path: '', component: MedecineInfoComponent, pathMatch: 'full' },
  { path: 'sell-buy', component: SellBuyComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [AuthGuard] },
  { path: 'pharmacy_orders', component: PharmacyOrderComponent, canActivate: [AuthGuard] },
  { path: 'shoppinglist', component: ShoppingCartListComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'shoppinglist/checkout', component: ShoppingCartCheckoutComponent, canActivate: [AuthGuard] },
  { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: '**', component: MedecineInfoComponent }
];
