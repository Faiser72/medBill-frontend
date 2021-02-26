import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledSalesOrdersComponent } from './canceled-sales-orders.component';

describe('CanceledSalesOrdersComponent', () => {
  let component: CanceledSalesOrdersComponent;
  let fixture: ComponentFixture<CanceledSalesOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceledSalesOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledSalesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
