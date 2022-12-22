import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ShoppingRoutingModule } from "./shopping-routing.module";
import { HomeComponent } from "./home/home.component";

import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [HomeComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    ShoppingRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
  ],
})
export class ShoppingModule {}
