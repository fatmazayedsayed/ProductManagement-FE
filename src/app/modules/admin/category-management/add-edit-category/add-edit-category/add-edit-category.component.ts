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
  patchId!: string;
  patchData: any;
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
      this.patchId = params.id;
    });
  }
  ngOnInit(): void {
    this.validationForm();
    this.getSourceEnums();
    if (this.patchId) {
      this.getPatchById();
    } else {
      return;
    }
    this.breadcrumbItems = [
      { label: 'categories', route: '/admin/categoryList' },
      { label: this.patchId ? 'Update category Details ' : 'Add category' },
    ];
  }

  validationForm() {
    this.categoryForm = new FormGroup({
      zipFile: new FormControl(null),
      categoryName: new FormControl(
        this.patchData ? this.patchData.name : '',
        Validators.required
      ),
      categorySource: new FormControl(
        this.patchData ? this.patchData.source : '',
        Validators.required
      ),
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const fileExtension = file.name?.split('.').pop().toLowerCase();
      const allowedExtensions = ['zip', 'rar'];

      if (!allowedExtensions.includes(fileExtension)) {
        this.categoryForm.patchValue({
          zipFile: null,
        });
        event.target.value = '';
        this.messageService.add({
          key: 'toast2',
          severity: 'error',
          summary: 'Error',
          detail: 'Invalid file type. Please upload a .zip or .rar file.',
        });
        return;
      }

      this.categoryForm.patchValue({
        zipFile: file,
      });
    }

    const formData = new FormData();

    Object.keys(this.categoryForm.value).forEach((key) => {
      const value = this.categoryForm.get(key)?.value;

      if (key === 'zipFile' && file) {
        formData.append(key, file);
      } else {
        formData.append(key, value);
      }
    });
  }

  fileTypeValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (file) {
      const fileExtension = file.name?.split('.').pop().toLowerCase();
      const allowedExtensions = ['zip', 'rar'];

      if (!allowedExtensions.includes(fileExtension)) {
        return { invalidFileType: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (!this.patchId) {
      this.categoryForm.controls['zipFile'].setValidators([Validators.required]);
      this.categoryForm.controls['zipFile'].updateValueAndValidity();
    }
    this.markFormsAsTouched.markFormGroupTouched(this.categoryForm);
    const formData = new FormData();

    const file = this.categoryForm.get('zipFile')?.value;
    if (file) {
      formData.append('zipFile', file);
    }

    const FormValues = { ...this.categoryForm.value };
    delete FormValues.zipFile;

    Object.keys(FormValues).forEach((key) => {
      const value = FormValues[key];

      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else {
        formData.append(key, value);
      }
    });
    if (this.categoryForm.valid) {
      if (!this.patchId) {
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
          id: this.patchId,
          patchName: this.categoryForm.get('categoryName')?.value,
          source: this.categoryForm.get('categorySource')?.value,
        };
        this.categoryService.editcategory(body).subscribe(
          (res: any) => {
            if (res.message === 'Patch updated successfully.') {
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
  getPatchById() {
    this.categoryService.getById(this.patchId).subscribe((res: any) => {
      this.patchData = res;

      this.lookUpCategories.forEach((e: any) => {
        if (e.name === this.patchData.source) {
          this.patchData.source = e.id;
        }
      });

      this.patchData.folderName = this.patchData.folderName || '';

      this.updateFormWithPatchData();
    });
  }

  getSourceEnums() {
    this.categoryService.getLookUpCategories().subscribe((res: any) => {
      this.lookUpCategories = res;
      this.lookUpCategories.pop();
    });
  }

  updateFormWithPatchData() {
    this.categoryForm.patchValue({
      categoryName: this.patchData.name,
      categorySource: this.patchData.source,
     });
  }
}
