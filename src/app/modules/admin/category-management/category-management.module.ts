import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementRoutingModule } from './category-management-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryManagementListComponent } from './category-management-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category/add-edit-category.component';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoryManagementListComponent,AddEditCategoryComponent],
  imports: [
    CommonModule,
    SharedModule,
    CategoryManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    DropdownModule

  ],
})
export class CategoryManagementModule {}
