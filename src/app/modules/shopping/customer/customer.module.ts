import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerRoutingModule } from "./customer-routing.module";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, CustomerRoutingModule, ReactiveFormsModule],
})
export class CustomerModule {}
