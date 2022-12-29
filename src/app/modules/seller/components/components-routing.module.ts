import { ListProductsComponent } from "./../products/list-products/list-products.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyComponent } from "../user/company/company.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsRoutingModule {}
