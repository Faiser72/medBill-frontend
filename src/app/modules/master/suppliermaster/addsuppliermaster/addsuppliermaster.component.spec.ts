import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsuppliermasterComponent } from './addsuppliermaster.component';

describe('AddsuppliermasterComponent', () => {
  let component: AddsuppliermasterComponent;
  let fixture: ComponentFixture<AddsuppliermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddsuppliermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsuppliermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
