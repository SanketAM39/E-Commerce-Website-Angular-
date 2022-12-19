import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, LogInGuard } from './services/guard/auth.guard';

const routes: Routes = [
  {
    path: 'seller',
    canActivate: [LogInGuard],
    loadChildren: () =>
      import('src/app/seller/seller.module').then((m) => m.SellerModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('src/app/shopping/shopping.module').then((m) => m.ShoppingModule),
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
