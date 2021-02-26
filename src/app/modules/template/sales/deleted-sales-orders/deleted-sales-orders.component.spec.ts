import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedSalesOrdersComponent } from './deleted-sales-orders.component';

describe('DeletedSalesOrdersComponent', () => {
  let component: DeletedSalesOrdersComponent;
  let fixture: ComponentFixture<DeletedSalesOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedSalesOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedSalesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
