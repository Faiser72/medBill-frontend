import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPurchaseEntryComponent } from './list-purchase-entry.component';

describe('ListPurchaseEntryComponent', () => {
  let component: ListPurchaseEntryComponent;
  let fixture: ComponentFixture<ListPurchaseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPurchaseEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPurchaseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
