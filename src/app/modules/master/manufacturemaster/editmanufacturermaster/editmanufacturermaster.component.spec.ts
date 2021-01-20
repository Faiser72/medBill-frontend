import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmanufacturermasterComponent } from './editmanufacturermaster.component';

describe('EditmanufacturermasterComponent', () => {
  let component: EditmanufacturermasterComponent;
  let fixture: ComponentFixture<EditmanufacturermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditmanufacturermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditmanufacturermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
