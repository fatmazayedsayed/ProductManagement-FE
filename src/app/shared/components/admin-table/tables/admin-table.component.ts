import { Router } from '@angular/router';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  isDevMode,
} from '@angular/core';
@Component({
  selector: 'app-admin-table',

  templateUrl: './admin-table.component.html',
  styleUrl: './admin-table.component.scss',
})
export class AdminTableComponent implements OnInit, OnChanges {
  @Input() cols: any[] = [];
  @Input() rows: any[] = [];
  @Input() filter: boolean = false;
  @Input() showAction: boolean = false;
  @Input() isSearch: boolean = true;
  @Input() sortInAllColumns: boolean = true;
  @Input() hasFilterAndSearch: boolean = true;
  @Input() sortColumns: any;
  @Input() isSearchOnly: boolean = true;
  @Input() hasLabel: boolean = true;

  @Input() placeholderSearch!: string;
  @Input() isId: boolean = false;
  @Input() hasImage: boolean = false;
  @Input() pageSize: number = 10;
  @Input() totalRecords!: number;
  @Input() imgLink!: string;
  @Input() imgPath!: string;
  @Input() editRoute!: string;
  @Input() ViewRoute!: string;
  @Input() detailsRoute!: string;
  @Input() tooltipName!: string;
  @Input() isSubDepartment!: boolean;
  @Input() subDepartmentRoute!: string;
  @Input() customClass!: string;
  @Input() hasActions: boolean = false;
  @Input() showCheckboxes: boolean = true;
  @Input() isDots: boolean = false;
  @Input() actions: any[] = [];
  @Input() selectedElements: any[] = [];
  selectedRows: any[] = [];
  @Input() hasPaginator: boolean = false;
  @Input() hasSort: boolean = true;
  @Input() dialogView: boolean = false;
  @Input() parentId!: string;
  @Input() searchText: string = ' ';
  selectedIds: string[] = [];
  @Input() hasLocalPagination: boolean = false;
  @Output() pageNumber: EventEmitter<number> = new EventEmitter();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  @Output() dataDetails: EventEmitter<any> = new EventEmitter();
  @Output() editItem: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDownloadClicked: EventEmitter<any> = new EventEmitter();
  @Output() changePasswordClicked: EventEmitter<any> = new EventEmitter();
  @Output() selectedElementsChange: EventEmitter<any[]> = new EventEmitter();
  @Output() filterOutput: EventEmitter<any> = new EventEmitter();
  @Output() deleteConfirmed: EventEmitter<number> = new EventEmitter();
  @Output() onViewClicked: EventEmitter<any> = new EventEmitter();

  @Input() sortField: string = '';
  sortOrder: number = 1;

  searchChoice: any;
  sourceChoice: any;
  page = 0;
  size = 10;
  selectAll: any;
  body: any = {};
  imageSources: { [key: string]: string | ArrayBuffer } = {};
  displayDialog: boolean = false;
  selectedId: any | null = null;
  selectedName: string | undefined;
  selectedSource: string | undefined;
  visible: boolean = false;
  dialogHeader: string = '';
  dialogAction: 'view' | 'delete' = 'view'; // Either 'view' or 'delete'
  // baseUrl = isDevMode() ? environment.apiBaseUrl : environment.apiBaseUrl;
  currentPage: number = 0;
  paginatedTableData: any[] = [];
  isActive: boolean = false; // Track if the button is active
  isYesHovered: boolean = false; // Track if the "Yes" button is hovered
  isNoHovered: boolean = false;

  @Output() sortChange: EventEmitter<any> = new EventEmitter();
   
  @Input() lookUpCategories: any[] = [];

  selectedFolder: any;
  constructor(private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    
    this.paginate({ first: 0, rows: this.pageSize });
    if (changes?.['rows'] && changes?.['rows'].currentValue) {
      this.updateSelectedElements(); // Update selection state when data changes
    }
  }
  updateSelectedElements() {
    this.selectedElements = this.rows.filter((row) =>
      this.globalSelectedElements.some((globalEl) => globalEl.id === row.id)
    );
      // If no selected elements, clear global selection as well
      if (this.selectedElements.length === 0) {
        this.globalSelectedElements = [];
    }
  }
  clearSelection() {
    this.globalSelectedElements = []; 
  }

  ngOnInit(): void {}

  currentSortField: string = '';
  currentSortOrder: number = 1;

  onSortChange(sortField: any) {
    if (sortField === 'name' || sortField === 'parentCategoryName') {
      if (this.currentSortField === sortField) {
        this.currentSortOrder = this.currentSortOrder * -1;
      } else {
        this.currentSortOrder = 1;
      }

      this.currentSortField = sortField;

      this.sortChange.emit({
        sortField: sortField,
        sortOrder: this.currentSortOrder,
      });
    }
  }

  getValue(obj: any, path: any, columnType = ''): string {
    if (
      typeof obj[path] === 'string' ||
      typeof obj[path] === 'number' ||
      obj[path] === null
    ) {
      if (['date', 'range'].includes(columnType)) {
        return obj[path];
      }
      return obj[path] || obj[path] === 0 ? obj[path] : '—';
    }

    const pathArr = path.split('.');

    if (path === 'skills' && obj[pathArr[0]] instanceof Array) {
      return obj[pathArr[0]].join(', ');
    }

    if (obj[pathArr[0]] instanceof Array) {
      let str = '';
      for (const item of obj[pathArr[0]]) {
        if (str.length) {
          str += ', ';
        }
        str += item[pathArr[1]];
      }
      return str;
    }

    // Handle non-array values
    if (!obj[pathArr[0]]) {
      return '';
    }

    const result = obj[pathArr[0]][pathArr[1]];
    if (result === null || result === undefined) {
      return '—';
    }

    return result;
  }

  onPageChange(event: any) {
    if (this.searchChoice) {
      event.search = this.searchChoice;
    } else {
      event.search = null;
    }
    if (this.sourceChoice) {
      event.source = this.sourceChoice;
    } else {
      event.source = -1;
    }

    this.pageNumber.emit(event);
  }

  filterChange(data: any) {
    
    if (this.searchChoice) {
      this.body.search = this.searchChoice ? this.searchChoice : null;
    } else {
      this.body.selectedId = data;
       

    }
    this.filterOutput.emit(this.body);

  }
  // test(e:any){
  //   console.log(e.target.value);
    
  // }

  ViewRouteDetails(details: any) {
    this.detailsRoute;
  }
  routeDetails(details: any) {
    this.dataDetails.emit(details);
  }
  editRouteDetails(details: any) {
    this.editItem.emit(details);
  }

  onDownload(details: any) {
    this.onDownloadClicked.emit(details);
  }

  onRowSelect(event: any) {
    this.selectedElementsChange.emit(this.selectedElements);
  }

  onRowUnselect(event: any) {
    this.selectedElementsChange.emit(this.selectedElements);
  }

  onSelect(id: string, event: MouseEvent) {
    const checkbox = event.target as HTMLInputElement; // Type casting

    if (checkbox.checked) {
      this.selectedIds.push(id);
    } else {
      const index = this.selectedIds.indexOf(id);
      if (index !== -1) {
        this.selectedIds.splice(index, 1);
      }
    }
    this.selectedElementsChange.emit(this.selectedIds);
  }
  globalSelectedElements: any[] = [];

  onSelectionChange(event: any) {
    this.updateGlobalSelectedElements();
    const ids = this.globalSelectedElements.map((element) => element.id);
     this.selectedElementsChange.emit(ids);
        // Clear selection if ids is empty
        if (ids.length === 0) {
          this.globalSelectedElements = [];
      }
  }

  onSelectAllChange(event: any) {
    if (event.checked) {
      this.rows.forEach((row) => {
        if (!this.globalSelectedElements.some((el) => el.id === row.id)) {
          this.globalSelectedElements.push(row);
        }
      });
    } else {
      this.rows.forEach((row: any) => {
        this.globalSelectedElements = this.globalSelectedElements.filter(
          (el) => el.id !== row.id
        );
      });
    }
    this.selectedElementsChange.emit(this.globalSelectedElements);
  }

  updateGlobalSelectedElements() {
    this.globalSelectedElements = this.globalSelectedElements.filter(
      (globalEl) =>
        !this.rows.some(
          (pageEl) =>
            pageEl.id === globalEl.id && !this.selectedElements.includes(pageEl)
        )
    );

    this.selectedElements.forEach((selectedEl) => {
      if (
        !this.globalSelectedElements.some(
          (globalEl) => globalEl.id === selectedEl.id
        )
      ) {
        this.globalSelectedElements.push(selectedEl);
      }
    });
  }
  paginate(event: any) {
    this.currentPage = event.first / event.rows;
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedTableData = this.rows?.slice(start, end);
  }
  navigateToDetails(row: any): void {
    this.dialogHeader = 'Item Details';
    if (this.dialogView == true) {
      this.displayDialog = true;
      this.dialogAction = 'view';
    } else {
      this.displayDialog = false;
      this.onViewClicked.emit(row);
    }
    this.selectedId = row.id;
    this.selectedName = row.name;
    this.selectedSource = row.source;
    this.selectedFolder = row.folderName;
    this.displayDialog = true;
  }
  closeDialog() {
    this.displayDialog = false;
  }
  onDelete(details: any) {
    this.dialogHeader = 'Delete Confirmation ';
    this.dialogAction = 'delete';
    this.displayDialog = true;
    this.selectedName = details.name; // assuming 'name' exists in the row data
    this.selectedId = details.id;
    this.onDeleteClicked.emit(details);
  }
  confirmDelete() {
    this.deleteConfirmed.emit(this.selectedId); // Emit the event to the parent component
    this.displayDialog = false;
  }

  changePassword(details: any) {
    this.changePasswordClicked.emit(details);
  }
}
