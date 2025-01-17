import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { ProductManagementListComponent } from './product-management-list.component';
import { ViewProductsComponent } from './view-product-details/view-products/view-products.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product/add-edit-product.component';

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
    component: ViewProductsComponent,
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
