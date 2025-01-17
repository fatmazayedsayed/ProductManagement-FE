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
    private messageService: MessageService
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
      parentCategoryId: new FormControl(
        this.categoryForm ? this.categortData.parentCategoryId : '',
        Validators.required
      ),
    });
  }


  onSubmit() {
    debugger;

    this.markFormsAsTouched.markFormGroupTouched(this.categoryForm);
    const formData = new FormData();


    const FormValues = { ...this.categoryForm.value };

    Object.keys(FormValues).forEach((key) => {
      const value = FormValues[key];

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });
    if (this.categoryForm.valid) {
      if (!this.categoryId) {
        this.categoryService.addcategory(formData).subscribe(
          (res: any) => {
            if (res) {
              this.messageService.add({
                key: 'toast1',
                severity: 'success',
                summary: 'Success',
                detail: 'category Added Successfully',
              });
              setTimeout(() => {
                this.router.navigate(['/admin/categoryList']);
              }, 500);
            }
          },

          (err: any) => {
            if (err) {
              this.messageService.add({
                key: 'toast2',
                severity: 'error',
                summary: 'Error',
                detail: 'Error In Adding category',
              });
            }
          }
        );
      } else {
        let body = {
          id: this.categoryId,
          name: this.categoryForm.get('categoryName')?.value,
          parentCategoryId: this.categoryForm.get('parentCategoryId')?.value,
        };
        this.categoryService.editcategory(body).subscribe(
          (res: any) => {
            if (res.message === 'category updated successfully.') {
              this.messageService.add({
                key: 'toast1',
                severity: 'success',
                summary: 'Success',
                detail: res.message,
              });
              setTimeout(() => {
                this.router.navigate(['/admin/categoryList']);
              }, 500);
            }
          },
          (err: any) => {
            if (err) {
              this.messageService.add({
                key: 'toast2',
                severity: 'error',
                summary: 'Error',
                detail: 'Error In Updating category',
              });
            }
          }
        );
      }
    }
  }

  resetForm() {
    this.categoryForm.reset();
  }
  getCategoryById() {
    this.categoryService.getById(this.categoryId).subscribe((res: any) => {
      debugger;
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
    debugger;
    this.categoryForm.patchValue({
      categoryName: this.categortData.name,
      parentCategoryId: this.categortData.parentCategoryId,
    });
  }
}
