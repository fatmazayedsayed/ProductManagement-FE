import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/services/search.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  providers: [MessageService],
})
export class SearchComponent implements OnInit {
  profileList: any[] = [];
  skillsList: any[] = [];
  batchesist: any[] = [];
  srcsList: any[] = [];
  years: any[] = [];
  searchForm!: FormGroup;
  headers = [
    {
      text: 'Name',
      field: 'name',
    },
    {
      text: 'Profile Name',
      field: 'profileName',
    },
    {
      text: 'Batch Name',
      field: 'patchName',
    },
    {
      text: 'Batch Source',
      field: 'source',
    },

    {
      text: 'years Of Experience',
      field: 'yearsOfExperience',
    },
    {
      text: 'Skills',
      field: 'skillName',
    },
  ];
  rowsData: any;
  pageNumber: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;
  searchString: any = '';
  isDropdownChanged: boolean = false;
  filter: boolean = false;
  @Output() searchChange = new EventEmitter<string>();
  hasValue: boolean = false;

  constructor(
    private searchService: SearchService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.createForm();
    this.getDropdownsData();
    // this.setupDropdownChangeDetection();
  }

  onSearchInputChange() {
    this.searchChange.emit(this.searchString);
  }
  createForm() {
    this.searchForm = new FormGroup({
      profileNames: new FormControl(undefined),
      patchNames: new FormControl(undefined),
      patchSources: new FormControl(undefined),
      yearsOfExperience: new FormControl(undefined),
      skills: new FormControl(undefined),
      sorting: new FormControl(undefined),
    });
  }

  getDropdownsData() {
    this.searchService
      .getDropdownData('GetProfileLookUp')
      .subscribe((res: any) => {
        this.profileList = res;
      });
    this.searchService
      .getDropdownData('GetSkillLookUp')
      .subscribe((res: any) => {
        this.skillsList = res;
      });
    this.searchService
      .getDropdownData('GetPatchLookUp')
      .subscribe((res: any) => {
        this.batchesist = res;
      });
    this.searchService
      .getDropdownData('GetPatchSourceLookUp')
      .subscribe((res: any) => {
        this.srcsList = res;
        this.srcsList.pop();
      });
    this.searchService
      .getDropdownData('GetAttendeesYearsOfExperiencesyncLookUp')
      .subscribe((res: any) => {
        this.years = res;
      });
  }
  // setupDropdownChangeDetection() {
  //   this.searchForm.valueChanges.subscribe(() => {
  //     this.isDropdownChanged = true;
  //   });
  // }
  onSubmit(event?: any) {
    this.test();

    this.pageNumber = event && event.page ? event.page + 1 : 1;
    this.pageSize = event && event.rows ? event.rows : 10;

    let body = {
      pageNumber: this.pageNumber,
      searchString: this.searchString,
      pageSize: this.pageSize,
      ...this.searchForm.value,
    };
    if (this.hasValue) {
      this.searchService.searchCandidates(body).subscribe(
        (res: any) => {
          this.rowsData = res.patches;
          res.patches.forEach((e: any) => {
            this.srcsList.forEach((el: any) => {
              if (e.source === el.id) {
                e.source = el.name;
              }
            });
          });
          this.totalRecords = res.count ? res.count : 0;
          this.pageNumber = res.pageNumber ? res.pageNumber : 0;
          this.pageSize = res.pageSize ? res.pageSize : 0;
          this.isDropdownChanged = false;

          if (res.message === 'No Attendees found with this search input: ') {
            this.messageService.add({
              key: 'toast1',
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
          }
        },

        (err: any) => {
          this.messageService.add({
            key: 'toast2',
            severity: 'error',
            summary: 'Error',
            detail: err.error.statusPhrase,
          });
        }
      );
    }
  }

  test() {
    this.hasValue = Object.keys(this.searchForm.controls).some((key) => {
      const control = this.searchForm.get(key);
      return (
        control &&
        control.value !== null &&
        control.value !== '' &&
        control.value !== undefined
      );
    });
    return this.hasValue ? null : { atLeastOneRequired: true };
  }
  submitFilter(event: any) {
    this.filter = true;

    this.pageNumber = event && event.page ? event.page + 1 : 1;
    this.pageSize = event && event.rows ? event.rows : 10;
    this.searchString = event && event.search ? event.search : ' ';
    let body = {
      pageNumber: this.pageNumber,
      searchString: this.searchString,
      pageSize: this.pageSize,
      ...this.searchForm.value,
    };
    this.searchService.searchCandidates(body).subscribe(
      (res: any) => {
        this.rowsData = res.patches;
        res.patches.forEach((e: any) => {
          this.srcsList.forEach((el: any) => {
            if (e.source === el.id) {
              e.source = el.name;
            }
            {
            }
          });
        });
        this.totalRecords = res.count ? res.count : 0;
        this.pageNumber = res.pageNumber ? res.pageNumber : 0;
        this.pageSize = res.pageSize ? res.pageSize : 0;
        this.isDropdownChanged = false;

        if (res.message === 'No Attendees found with this search input: ') {
          this.messageService.add({
            key: 'toast1',
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
        }
      },

      (err: any) => {
        this.messageService.add({
          key: 'toast2',
          severity: 'error',
          summary: 'Error',
          detail: err.error.statusPhrase,
        });
      }
    );
  }
}
