import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProductComponent } from './view-product/view-product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [ListProductsComponent, ViewProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    UserModule,
  ],
})
export class ProductsModule {}
