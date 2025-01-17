import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProductManagementListComponent } from './product-management-list.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product/add-edit-product.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductManagementListComponent,AddEditProductComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule

  ],
})
export class ProductManagementModule {}
