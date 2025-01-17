import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ProductManagementListComponent } from './product-management-list.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDetailsComponent } from './product-details/product-details.component';


const routes: Routes = [
    { path: '', component: ProductManagementListComponent },
{path:'view-product',component:ProductDetailsComponent},
{path:'add-Edit-product',component:AddEditProductComponent},


]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ProductManagementRoutingModule {}