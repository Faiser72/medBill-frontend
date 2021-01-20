import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseEntryComponent } from './update-purchase-entry.component';

describe('UpdatePurchaseEntryComponent', () => {
  let component: UpdatePurchaseEntryComponent;
  let fixture: ComponentFixture<UpdatePurchaseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePurchaseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
