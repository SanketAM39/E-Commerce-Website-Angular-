import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailComponent } from 'src/app/modules/seller/user/verify-email/verify-email.component';
import { AuthGuard, LogInGuard } from '../../services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('src/app/modules/seller/auth/auth.module').then(
        (m) => m.AuthModule
      ),
    canActivate: [LogInGuard],
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/modules/seller/user/user.module').then(
        (m) => m.UserModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('src/app/modules/seller/products/products.module').then(
        (m) => m.ProductsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/verify-email',
    component: VerifyEmailComponent,
  },
  {
    path: '**',
    loadChildren: () =>
      import('src/app/modules/seller/auth/auth.module').then(
        (m) => m.AuthModule
      ),
    canActivate: [LogInGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellerRoutingModule {}
