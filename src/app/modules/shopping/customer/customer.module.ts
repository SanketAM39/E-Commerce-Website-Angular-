import { ReactiveFormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CustomerRoutingModule } from "./customer-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { OrdersComponent } from "./orders/orders.component";
import { PaymentComponent } from "./payment/payment.component";

import { OrderDetailsComponent } from "./order-details/order-details.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    ProfileComponent,
    OrdersComponent,
    PaymentComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
})
export class CustomerModule {}
