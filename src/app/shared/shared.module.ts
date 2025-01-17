import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminTableComponent } from './components/admin-table/tables/admin-table.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DropdownModule } from 'primeng/dropdown';
import { UserHeaderComponent } from './components/user-header/header/user-header.component';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  declarations: [
    AdminTableComponent,
    BreadcrumbComponent,
    UserHeaderComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    TableModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    PaginatorModule,
    DialogModule,
    MultiSelectModule,
    ButtonModule,
    DropdownModule,
  ],

  exports: [
    AdminTableComponent,
    BreadcrumbComponent,
    UserHeaderComponent,
    DropdownComponent,
  ],
})
export class SharedModule {}
