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
import { GuidDefault } from 'src/app/shared/helpers/GuidDefault';
import { ProductService } from 'src/app/services/products.service';
import { CategoryService } from 'src/app/services/categories.service';
import { ProductStatus } from 'src/app/shared/helpers/enums';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
  providers: [MessageService],
})
export class AddEditProductComponent implements OnInit {
  productForm!: FormGroup;
  lookUpCategories: any[] = [];
  productId!: string;
  productData: any;
  disabled: boolean = true;
  breadcrumbItems = [
    { label: 'products List', route: '/admin/productList' },
    { label: 'Add product' },
  ];
  constructor(
    private markFormsAsTouched: ControlingFormsService,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private _GuidDefault: GuidDefault,

  ) {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.productId = params.id;
    });
  }
  ngOnInit(): void {
    this.validationForm();
    this.getLookUpCategories();
    if (this.productId) {
      this.getproductById();
    } else {
      this.productId = this._GuidDefault.getDefaultGUID();

      return;
    }
    this.breadcrumbItems = [
      { label: 'categories', route: '/admin/productList' },
      { label: this.productId ? 'Update product Details ' : 'Add product' },
    ];
  }
  statusOptions = [
    { label: 'Inactive', value: ProductStatus.Inactive },
    { label: 'Active', value: ProductStatus.Active },
    { label: 'Discontinued', value: ProductStatus.Discontinued }
  ];
  validationForm() {
    this.productForm = new FormGroup({
      productName: new FormControl(
        this.productForm ? this.productData.productName : '',
        Validators.required
      ),
      description: new FormControl(
        this.productForm ? this.productData.description : '',
        Validators.required
      ),
      categoryId: new FormControl(
        this.productForm ? this.productData.categoryId : '',
        Validators.required
      ),
      price: new FormControl(
        this.productForm ? this.productData.price : 0, // Set default value as needed
        Validators.required
      ),
      status: new FormControl(
        this.productForm ? this.productData.status : null, // Set default value as needed
        Validators.required
      ),
      stockQuantity: new FormControl(
        this.productForm ? this.productData.stockQuantity : 0, // Set default value as needed
        Validators.required
      ),
      imageUrl: new FormControl(
        this.productForm ? this.productData.imageUrl : '', // Set default value as needed
      ),
    });
  }
  onSubmit() {
    const body = {
      id: this.productId,
      name: this.productForm.get('productName')?.value,
      description: this.productForm.get('description')?.value,
      categoryId: this.productForm.get('categoryId')?.value || null,
      price: this.productForm.get('price')?.value || 0,
      status: this.productForm.get('status')?.value || ProductStatus.Active, // Default to Active or appropriate default
      stockQuantity: this.productForm.get('stockQuantity')?.value || 0,
      imageUrl: this.productForm.get('imageUrl')?.value || '',
    };
    debugger;
    if (this.productForm.valid) {
      if (this.productId !== this._GuidDefault.getDefaultGUID()) {
        // Edit existing product


        this._productService.editProduct(body).subscribe(
          (res: any) => {
            this.setResultMessage(true);
          },
          (err: any) => {
            this.setError(true);
          }
        );
      } else {
        // Add new product
        this._productService.addProduct(body).subscribe(
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
      detail: isEdit ? 'product Updated Successfully' : 'product Added Successfully',
    });
    setTimeout(() => {
      this.router.navigate(['/admin/productList']);
    }, 500);
  }


  setError(isEdit: boolean) {
    this.messageService.add({
      key: 'toast2',
      severity: 'error',
      summary: 'Error',
      detail: isEdit ? 'product could not be updated' : 'product could not be added',
    });
  }

  resetForm() {
    this.productForm.reset();
  }
  getproductById() {
    this._productService.getById(this.productId).subscribe((res: any) => {
      debugger;
      this.productData = res.data;

      this.lookUpCategories.forEach((e: any) => {
        if (e.name === this.productData.categoryId) {
          this.productData.categoryId = e.id;
        }
      });


      this.updateFormWithproductData();
    });
  }

  getLookUpCategories() {
    this._categoryService.getLookUpCategories().subscribe((res: any) => {
      this.lookUpCategories = res.data;
      this.lookUpCategories.pop();

    });
  }

  updateFormWithproductData() {
    this.productForm.patchValue({
      productName: this.productData.name,
      description: this.productData.description,
      price: this.productData.price,
      status: this.productData.status,
      stockQuantity: this.productData.stockQuantity,
      categoryId: this.productData.categoryId,
    });
  }
}
