import { HttpClientModule } from "@angular/common/http";
import { RegisterComponent } from "./register/register.component";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";
import { LoginComponent } from "./login/login.component";

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
})
export class AuthModule {}
