import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { CategoryManagementListComponent } from './category-management-list.component';
import { ViewCategoriesComponent } from './view-category-details/view-categories/view-categories.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category/add-edit-category.component';

const routes: Routes = [
  { path: '', 
    component: CategoryManagementListComponent 
  },
  {
    path: 'addEditCategory',
    component: AddEditCategoryComponent,
  },
  {
    path: 'viewCategory',
    component: ViewCategoriesComponent,
  },
  {
    path: 'addCategory',
    component: AddEditCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryManagementRoutingModule {}
