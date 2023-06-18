import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyalCustViewPageComponent } from './loyal-cust-view-page.component';

describe('LoyalCustViewPageComponent', () => {
  let component: LoyalCustViewPageComponent;
  let fixture: ComponentFixture<LoyalCustViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoyalCustViewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoyalCustViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
