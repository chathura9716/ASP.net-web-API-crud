import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalCustDialogComponent } from './loyal-cust-dialog.component';

describe('LoyalCustDialogComponent', () => {
  let component: LoyalCustDialogComponent;
  let fixture: ComponentFixture<LoyalCustDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyalCustDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyalCustDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
