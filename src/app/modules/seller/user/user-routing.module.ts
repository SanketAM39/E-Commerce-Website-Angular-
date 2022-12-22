import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CompanyComponent } from "./company/company.component";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { VerifyEmailComponent } from "../../../verify-email/verify-email.component";
import { AuthGuard } from "src/app/services/guard/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "my-profile",
    pathMatch: "full",
  },
  {
    path: "my-profile",
    component: MyprofileComponent,
  },
  {
    path: "company",
    component: CompanyComponent,
  },

  { path: "seller/auth/verify-email", component: VerifyEmailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
