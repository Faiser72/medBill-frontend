import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseEntryHomeComponent } from './purchase-entry-home.component';

describe('PurchaseEntryHomeComponent', () => {
  let component: PurchaseEntryHomeComponent;
  let fixture: ComponentFixture<PurchaseEntryHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseEntryHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseEntryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
