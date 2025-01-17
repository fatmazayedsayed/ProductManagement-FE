import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/services/categories.service';
import { ProductService } from 'src/app/services/products.service';
import { GuidDefault } from 'src/app/shared/helpers/GuidDefault';

@Component({
  selector: 'app-product-management-list',
  templateUrl: './product-management-list.component.html',
   providers: [MessageService],
})
export class ProductManagementListComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 10;
  filter: boolean = false;
  searchString: string = ' ';
  productData: any;
  totalRecords: number = 0;
  displayDialog: boolean = false; // Added for dialog visibility
  deleteId: string = '';
  categoryId: string = '';
  lookUpCategories: any[] = [];
  currentSorting: string = 'asc';
  constructor(
    private _productSerive: ProductService,
    private _categorySerive: CategoryService,
    private _GuidDefault: GuidDefault,
    private messageService: MessageService,
    private router: Router
  ) {
    this.categoryId = this._GuidDefault.getDefaultGUID();
  }
  ngOnInit() {
     this.getAllProducts();
   }
  headers = [
    {
      text: 'product Name',
      field: 'name',
    },
    {
      text: ' Category',
      field: 'categoryName',
    },
  ];
  breadcrumbItems = [{ label: 'product List', route: '/admin/productList' }];

  actions = ['canEdit', 'canDelete'];
  getAllProducts(event?: any) {
     this.pageNumber = event && event.page ? event.page + 1 : 1;
    this.pageSize = event && event.rows ? event.rows : 10;

    this._productSerive
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.searchString,
        this.categoryId,
        this.currentSorting
      )
      .subscribe((res: any) => {
        this.productData = res.data.records;
        this.totalRecords = res.data.count;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
      });
  }
  onSortChange(event: any) {
    console.log(event);

    if (event.sortOrder === 1) {
      this.currentSorting = 'asc';
    } else if (event.sortOrder === -1) {
      this.currentSorting = `${event.sortField}_descending`;
    }
    this.getAllProducts();
  }

  submitFilter(event: any) {
    this.filter = true;
    this.pageNumber = event.page ? event.page + 1 : 1;
    this.pageSize = event?.rows ? event?.rows : 10;
    this.searchString = event.search ? event.search : ' ';
    this.categoryId = event.parentCategoryId ? event.categoryId : this._GuidDefault.getDefaultGUID();

    this._productSerive
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.searchString,
        this.categoryId,
        this.currentSorting
      )
      .subscribe((res: any) => {
        this.productData = res.records;
        this.totalRecords = res.count;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
      });
  }
  onDelete(event: any) {
    this.deleteproduct(event);
  }

  deleteproduct(e: any) {
    this.deleteId = e;
    if (this.deleteId) {
      this._productSerive.delete(this.deleteId).subscribe(
        (response) => {
          this.getAllProducts({
            page: this.pageNumber - 1,
            rows: this.pageSize,
            searchString: this.searchString,
          });

          if (response === 'Success Deleted') {
            this.messageService.add({
              key: 'toast1',
              severity: 'success',
              summary: 'Success',
              detail: 'product Deleted Successfully',
            });
          } else {
            this.messageService.add({
              key: 'toast2',
              severity: 'error',
              summary: 'Error',
              detail: 'product could not be deleted.',
            });
          }

          console.log(response);
        },
        (error) => {
          this.messageService.add({
            key: 'toast2',
            severity: 'error',
            summary: 'Error',
            detail: error.message || 'Failed to delete the Category',
          });
        }
      );
    }
  }
  goToEdit(event: any) {
    this.router.navigate(['/admin/productList/addEditProduct'], {
      queryParams: { id: event.id },
    });
  }
  getParentCategory() {
    this._categorySerive.getLookUpCategories().subscribe((res: any) => {
      this.lookUpCategories = res.data;
      this.lookUpCategories.pop();
       
    });
  }
}
