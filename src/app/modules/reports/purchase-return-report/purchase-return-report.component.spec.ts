import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReturnReportComponent } from './purchase-return-report.component';

describe('PurchaseReturnReportComponent', () => {
  let component: PurchaseReturnReportComponent;
  let fixture: ComponentFixture<PurchaseReturnReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReturnReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
