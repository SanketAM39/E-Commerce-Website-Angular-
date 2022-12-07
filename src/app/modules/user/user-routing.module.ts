import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/my-profile',
    pathMatch: 'full',
  },
  {
    path: 'my-profile',
    component: MyprofileComponent,
  },
  {
    path: 'company',
    component: CompanyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
