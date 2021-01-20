import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmanufacturermasterComponent } from './addmanufacturermaster.component';

describe('AddmanufacturermasterComponent', () => {
  let component: AddmanufacturermasterComponent;
  let fixture: ComponentFixture<AddmanufacturermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmanufacturermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmanufacturermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
