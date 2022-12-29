import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: { title: "Login" },
  },
  {
    path: "signup",
    component: RegisterComponent,
    data: { title: "User Signup" },
  },
  {
    path: "reset-password",
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReactiveFormsModule, FormsModule],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
