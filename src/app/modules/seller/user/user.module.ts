import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { MyprofileComponent } from "./myprofile/myprofile.component";
import { HeaderComponent } from "src/app/modules/seller/components/header/header.component";
import { CompanyComponent } from "./company/company.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { VerifyEmailComponent } from "../../../verify-email/verify-email.component";
import { NgxPaginationModule } from "ngx-pagination";
@NgModule({
  declarations: [
    MyprofileComponent,
    HeaderComponent,
    CompanyComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  exports: [HeaderComponent],
})
export class UserModule {}
