import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmanufacturermasterComponent } from './listmanufacturermaster.component';

describe('ListmanufacturermasterComponent', () => {
  let component: ListmanufacturermasterComponent;
  let fixture: ComponentFixture<ListmanufacturermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListmanufacturermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmanufacturermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
