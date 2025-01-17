import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CategoryService } from 'src/app/services/categories.service';
import { GuidDefault } from 'src/app/shared/GuidDefault';

@Component({
  selector: 'app-category-management-list',
  templateUrl: './category-management-list.component.html',
  styleUrl: './category-management-list.component.scss',
  providers: [MessageService],
})
export class CategoryManagementListComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 10;
  filter: boolean = false;
  searchString: string = ' ';
  categoryData: any;
  totalRecords: number = 0;
  displayDialog: boolean = false; // Added for dialog visibility
  deleteId: string = '';
  parentCategoryId: string = '';
  lookUpCategories: any[] = [];
  currentSorting: string = 'asc';
  constructor(
    private _categorySerive: CategoryService,
    private _GuidDefault: GuidDefault,
    private messageService: MessageService,
    private router: Router
  ) {
    this.parentCategoryId = this._GuidDefault.getDefaultGUID();
  }
  ngOnInit() {
    debugger;
    this.getAllCategories();
    this.getParentCategory();
  }
  headers = [
    {
      text: 'Category Name',
      field: 'name',
    },
    {
      text: ' Category Source',
      field: 'parentCategoryId',
    },
  ];
  breadcrumbItems = [{ label: 'Category List', route: '/admin/categoryList' }];

  actions = ['canEdit', 'canDelete'];
  getAllCategories(event?: any) {
    debugger;
    this.pageNumber = event && event.page ? event.page + 1 : 1;
    this.pageSize = event && event.rows ? event.rows : 10;

    this._categorySerive
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.searchString,
        this.parentCategoryId,
        this.currentSorting
      )
      .subscribe((res: any) => {
        this.categoryData = res.records;
        this.totalRecords = res.count;
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
    this.getAllCategories();
  }

  submitFilter(event: any) {
    this.filter = true;
    this.pageNumber = event.page ? event.page + 1 : 1;
    this.pageSize = event?.rows ? event?.rows : 10;
    this.searchString = event.search ? event.search : ' ';
    this.parentCategoryId = event.parentCategoryId ? event.parentCategoryId : this._GuidDefault.getDefaultGUID();

    this._categorySerive
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.searchString,
        this.parentCategoryId,
        this.currentSorting
      )
      .subscribe((res: any) => {
        this.categoryData = res.records;
        this.totalRecords = res.count;
        this.pageNumber = res.pageNumber;
        this.pageSize = res.pageSize;
      });
  }
  onDelete(event: any) {
    this.deleteCategory(event);
  }

  deleteCategory(e: any) {
    this.deleteId = e;
    if (this.deleteId) {
      this._categorySerive.delete(this.deleteId).subscribe(
        (response) => {
          this.getAllCategories({
            page: this.pageNumber - 1,
            rows: this.pageSize,
            searchString: this.searchString,
          });

          if (response === 'Success Deleted') {
            this.messageService.add({
              key: 'toast1',
              severity: 'success',
              summary: 'Success',
              detail: 'Category Deleted Successfully',
            });
          } else {
            this.messageService.add({
              key: 'toast2',
              severity: 'error',
              summary: 'Error',
              detail: 'Category could not be deleted.',
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
    this.router.navigate(['/admin/categoryList/addEditCategory'], {
      queryParams: { id: event.id },
    });
  }
  getParentCategory() {
    this._categorySerive.getLookUpCategories().subscribe((res: any) => {
      debugger;
      this.lookUpCategories = res;
      this.lookUpCategories.pop();
       
    });
  }
}
