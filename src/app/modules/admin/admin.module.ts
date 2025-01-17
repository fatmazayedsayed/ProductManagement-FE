import { CategoryManagementListComponent } from './category-management/category-management-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ToastModule } from 'primeng/toast';
import { CategoryManagementModule } from './category-management/category-management.module';
import { ProductManagementRoutingModule } from './product-managment/product-management-routing.module';
import { ProductManagementListComponent } from './product-managment/product-management-list.component';
import { SharedModule } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { MessagesModule } from 'primeng/messages';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { TreeModule } from 'primeng/tree';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    CategoryManagementModule,
    ProductManagementRoutingModule,
    PaginatorModule,
    MessagesModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    PanelModule,
    TreeModule,
    RouterModule,
  ]
})
export class AdminModule { }
