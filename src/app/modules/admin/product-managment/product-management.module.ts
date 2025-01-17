import { CommonModule } from '@angular/common';
import { ProductManagementListComponent } from './product-management-list.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';
import { TreeModule } from 'primeng/tree';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';

@NgModule({
  declarations: [ProductManagementListComponent,ProductDetailsComponent,AddEditProductComponent],
  imports: [
    CommonModule,
    ProductManagementRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    FormsModule,
    TreeModule,
    SharedModule,
    RouterModule,
  ],

})
export class ProductManagementModule {}
