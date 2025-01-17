import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-management-list',
  templateUrl: './product-management-list.component.html',
  styleUrl: './product-management-list.component.scss',
  providers: [MessageService],
})
export class ProductManagementListComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 10;
  filter: boolean = false;
  searchString: string = ' ';
  profileData: any;
  totalRecords: number = 0;
  displayDialog: boolean = false;
  actions = ['canEdit', 'canView', 'canDelete'];
  deleteId: string = '';

  constructor(
    private messageService: MessageService,
    private _profileService: ProductService,
    private router: Router
  ) {}
  breadcrumbItems = [{ label: 'Profiles List' }];
  headers = [
    {
      text: 'Profile Name',
      field: 'name',
    },
    {
      text: ' Number of Questions',
      field: 'numberOfQuestions',
    },
    {
      text: 'Number of Outputs',
      field: 'numberOfOutputs',
    },
  ];

  ngOnInit(): void {
    this.getAllProfiles();
  }
  submitFilter(event: any) {
    this.pageNumber = event && event.page ? event.page + 1 : 1;
    this.pageSize = event && event.rows ? event.rows : 10;
    this.searchString = event.search ? event.search : ' ';
    this._profileService
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.searchString,
        this.currentSorting
      )
      .subscribe((res: any) => {
        this.profileData = res.profiles;
        this.totalRecords = res.totalCount;
      });
  }
  getAllProfiles(event?: any) {
    this.pageNumber = event && event.page ? event.page + 1 : 1;
    this.pageSize = event && event.rows ? event.rows : 10;

    this._profileService
      .getAll(
        this.pageNumber,
        this.pageSize,
        this.searchString,
        this.currentSorting
      )
      .subscribe((res: any) => {
        this.profileData = Array.isArray(res.profiles) ? res.profiles : [];
        this.totalRecords = res.totalCount;
      });
  }
  currentSorting: string = 'asc';
  sortOrder: number = 1;

  onSortChange(event: any) {
    if (event.sortOrder === 1) {
      this.currentSorting = 'asc';
    } else if (event.sortOrder === -1) {
      this.currentSorting = `${event.sortField}_descending`;
    }
    this.getAllProfiles();
  }

  onDelete(event: any) {
    this.deleteBatch(event);
  }
  test(e: any) {
    console.log(e);
  }

  deleteBatch(e: any) {
    this.deleteId = e;
    if (this.deleteId) {
      this._profileService.delete(this.deleteId).subscribe(
        (response) => {
          this.getAllProfiles({
            page: this.pageNumber - 1,
            rows: this.pageSize,
            searchString: this.searchString,
          });

          if (response === 'product successfully marked as deleted.') {
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
            detail: error.message || 'Failed to delete the batch',
          });
        }
      );
    }
  }
  viewDetails(event: any) {}
  goToEdit(event: any) {
    this.router.navigate(['/admin/productList/add-Edit-product'], {
      queryParams: { id: event.id },
    });
  }
}
