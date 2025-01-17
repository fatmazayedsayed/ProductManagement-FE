import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, TreeNode } from 'primeng/api';
import { CategoryService } from 'src/app/services/categories.service';
 
@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.scss',
  providers: [MessageService],

})
export class ViewCategoriesComponent {
  categoryTree: any;
  router: any;
  id: string;

  breadcrumbItems = [
    { label: 'category List', route: '/admin/categoryList' },
    { label: 'category Details' }   
  ];
  constructor(private fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private _categoryService: CategoryService,
  ) {
    this.id = this._activatedRoute.snapshot.queryParams['id'];

  }
  ngOnInit(): void {
    
    this.getcategoryDetails(this.id)
  }
  getcategoryDetails(categoryId: string) {
    this._categoryService.getById(this.id).subscribe((response: any) => {
     this.categoryTree=(response.data)
    })
  }

  


  goBack(): void {
    this.router.navigate(['/admin/categoryList']);
  }
}
