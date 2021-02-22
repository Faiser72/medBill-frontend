import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseReportByPaymentModeComponent } from './purchase-report-by-payment-mode.component';

describe('PurchaseReportByPaymentModeComponent', () => {
  let component: PurchaseReportByPaymentModeComponent;
  let fixture: ComponentFixture<PurchaseReportByPaymentModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseReportByPaymentModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReportByPaymentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
