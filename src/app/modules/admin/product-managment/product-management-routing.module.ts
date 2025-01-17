import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ProductManagementListComponent } from './product-management-list.component';
 import { AddEditProductComponent } from './add-edit-product/add-edit-product/add-edit-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
 
const routes: Routes = [
  { path: '', 
    component: ProductManagementListComponent 
  },
  {
    path: 'addEditProduct',
    component: AddEditProductComponent,
  },
  {
    path: 'viewProduct',
    component: ProductDetailsComponent,
  },
  {
    path: 'addProduct',
    component: AddEditProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductManagementRoutingModule {}
