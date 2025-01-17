import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { ProductService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
  providers: [MessageService],

})
export class ProductDetailsComponent {
  productTree: any;
  router: any;
  id: string;

  breadcrumbItems = [
    { label: 'product List', route: '/admin/productList' },
    { label: 'product Details' }   
  ];
  constructor(private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private _productService: ProductService,
  ) {
    this.id = this._activatedRoute.snapshot.queryParams['id'];

  }
  ngOnInit(): void {
    
    this.getproductDetails(this.id)
  }
  getproductDetails(productId: string) {
    this._productService.getById(this.id).subscribe((response: any) => {
     this.productTree=(response.data)
    })
  }

  


  goBack(): void {
    this.router.navigate(['/admin/productList']);
  }
}
