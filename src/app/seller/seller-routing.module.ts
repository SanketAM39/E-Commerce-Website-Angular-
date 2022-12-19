import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LogInGuard } from '../services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [LogInGuard],
    loadChildren: () =>
      import('src/app/modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/modules/products/products.module').then(
        (m) => m.ProductsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
