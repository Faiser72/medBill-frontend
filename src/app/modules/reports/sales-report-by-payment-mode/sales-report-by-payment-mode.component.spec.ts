import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportByPaymentModeComponent } from './sales-report-by-payment-mode.component';

describe('SalesReportByPaymentModeComponent', () => {
  let component: SalesReportByPaymentModeComponent;
  let fixture: ComponentFixture<SalesReportByPaymentModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SalesReportByPaymentModeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportByPaymentModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
