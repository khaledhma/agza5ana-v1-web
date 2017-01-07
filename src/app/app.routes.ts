import { Routes } from '@angular/router';

import { MedecineInfoComponent } from './medecine-info/medecine-info.component';
import { OrdersComponent } from './orders/orders.component'


export const appRoutes: Routes = [
  { path: '', component: MedecineInfoComponent, pathMatch: 'full' },
  { path: 'orders', component: OrdersComponent },
  { path: '**', component: MedecineInfoComponent }
];
