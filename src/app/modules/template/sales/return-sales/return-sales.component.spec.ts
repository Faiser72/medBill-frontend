import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnSalesComponent } from './return-sales.component';

describe('ReturnSalesComponent', () => {
  let component: ReturnSalesComponent;
  let fixture: ComponentFixture<ReturnSalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnSalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
