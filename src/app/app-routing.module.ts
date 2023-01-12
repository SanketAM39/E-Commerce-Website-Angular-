import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, LogInGuard } from "./services/guard/auth.guard";

const routes: Routes = [
  {
    path: "seller",
    loadChildren: () =>
      import("src/app/modules/seller/seller.module").then(
        (m) => m.SellerModule
      ),
  },
  {
    path: "",
    loadChildren: () =>
      import("src/app/modules/shopping/shopping.module").then(
        (m) => m.ShoppingModule
      ),
  },

  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {}
}
