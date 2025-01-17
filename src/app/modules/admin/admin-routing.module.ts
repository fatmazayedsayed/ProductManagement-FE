import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

let userData = JSON.parse(localStorage.getItem('userData') || '{}');
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./category-management/category-management.module').then(
        (m) => m.CategoryManagementModule
      ),
  },

  
  {
    path:'productList',
    loadChildren:()=>
      import('./product-managment/product-management.module').then(
        (m)=> m.ProductManagementModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
