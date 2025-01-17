import { CategoryService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ControlingFormsService } from 'src/app/services/controling-forms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import _default from 'primeng/public_api';
import { GuidDefault } from 'src/app/shared/GuidDefault';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.scss',
  providers: [MessageService],
})
export class AddEditCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  lookUpCategories: any[] = [];
  categoryId!: string;
  categortData: any;
  disabled: boolean = true;
  breadcrumbItems = [
    { label: 'categoryes List', route: '/admin/categoryList' },
    { label: 'Add category' },
  ];
  constructor(
    private markFormsAsTouched: ControlingFormsService,
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
        private _GuidDefault: GuidDefault,
    
  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.categoryId = params.id;
    });
  }
  ngOnInit(): void {
    this.validationForm();
    this.getLookUpCategories();
    if (this.categoryId) {
      this.getCategoryById();
    } else {
       this.categoryId=this._GuidDefault.getDefaultGUID();

      return;
    }
    this.breadcrumbItems = [
      { label: 'categories', route: '/admin/categoryList' },
      { label: this.categoryId ? 'Update category Details ' : 'Add category' },
    ];
  }

  validationForm() {
    this.categoryForm = new FormGroup({
      categoryName: new FormControl(
        this.categoryForm ? this.categortData.categoryName : '',
        Validators.required
      ),
      description: new FormControl(
        this.categoryForm ? this.categortData.description : '',
        Validators.required
      ),
      parentCategoryId: new FormControl(
        this.categoryForm ? this.categortData.parentCategoryId : '',
        Validators.required
      ),
    });
  }

  onSubmit() {
    const body = {
     id: this.categoryId,
      name: this.categoryForm.get('categoryName')?.value, // Map categoryName to name
      description: this.categoryForm.get('description')?.value,
      parentCategoryId: this.categoryForm.get('parentCategoryId')?.value || null, // Ensure it's null if not set
    };
  
    if (this.categoryForm.valid) {
      if(this.categoryId!=this._GuidDefault.getDefaultGUID()) {
        //edit
        this.categoryService.editcategory(body).subscribe(
          (res: any) => {
            this.setResultMessage(true);
           },
           (err: any) => {
            this.setError(true);
           }
        );
      } else {
      this.categoryService.addCategory(body).subscribe(
        (res: any) => {
         this.setResultMessage(false);
        },
        (err: any) => {
         this.setError(false);
        }
      );
    }
  }
  }
  setResultMessage(isEdit: boolean) {
     this.messageService.add({
      key: 'toast1',
      severity: 'success',
      summary: 'Success',
      detail: isEdit?'Category Updated Successfully': 'Category Added Successfully',
    });
    setTimeout(() => {
      this.router.navigate(['/admin/categoryList']);
    }, 500);  }
  

    setError(isEdit: boolean) {
      this.messageService.add({
        key: 'toast2',
        severity: 'error',
        summary: 'Error',
        detail: isEdit?'Category could not be updated': 'Category could not be added',
      });
    }
  
  resetForm() {
    this.categoryForm.reset();
  }
  getCategoryById() {
    this.categoryService.getById(this.categoryId).subscribe((res: any) => {
      this.categortData = res.data;

      this.lookUpCategories.forEach((e: any) => {
        if (e.name === this.categortData.parentCategoryId) {
          this.categortData.parentCategoryId = e.id;
        }
      });


      this.updateFormWithCategoryData();
    });
  }

  getLookUpCategories() {
    this.categoryService.getLookUpCategories().subscribe((res: any) => {
      this.lookUpCategories = res.data;
      this.lookUpCategories.pop();
    });
  }

  updateFormWithCategoryData() {
    this.categoryForm.patchValue({
      categoryName: this.categortData.name,
      description: this.categortData.description,
      parentCategoryId: this.categortData.parentCategoryId,
    });
  }
}
