import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewChatDialogComponent } from './add-new-chat-dialog.component';

describe('AddNewChatDialogComponent', () => {
  let component: AddNewChatDialogComponent;
  let fixture: ComponentFixture<AddNewChatDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewChatDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddNewChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
