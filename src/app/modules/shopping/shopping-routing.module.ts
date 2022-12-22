import {
  customerGuard,
  ShoppingGuard,
} from "./../../services/guard/shopping.guard";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "auth",
    loadChildren: () =>
      import("src/app/modules/shopping/auth/auth.module").then(
        (m) => m.AuthModule
      ),
    canActivate: [ShoppingGuard],
  },
  {
    path: "customer",
    loadChildren: () =>
      import("src/app/modules/shopping/customer/customer.module").then(
        (m) => m.CustomerModule
      ),
    canActivate: [customerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingRoutingModule {}
