import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementListComponent } from './product-management-list.component';

describe('ProductManagementListComponent', () => {
  let component: ProductManagementListComponent;
  let fixture: ComponentFixture<ProductManagementListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagementListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductManagementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
