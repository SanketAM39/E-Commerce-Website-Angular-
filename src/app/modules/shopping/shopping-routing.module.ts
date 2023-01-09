import {
  customerGuard,
  ShoppingGuard,
} from './../../services/guard/shopping.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { CartComponent } from './home/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('src/app/modules/shopping/home/home.module').then(
        (m) => m.HomeModule
      ),
  },

  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/modules/shopping/auth/auth.module').then(
        (m) => m.AuthModule
      ),
    // canActivate: [ShoppingGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('src/app/modules/shopping/customer/customer.module').then(
        (m) => m.CustomerModule
      ),
    // canActivate: [customerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
