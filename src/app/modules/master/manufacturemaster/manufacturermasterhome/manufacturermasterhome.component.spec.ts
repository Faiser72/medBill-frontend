import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturermasterhomeComponent } from './manufacturermasterhome.component';

describe('ManufacturermasterhomeComponent', () => {
  let component: ManufacturermasterhomeComponent;
  let fixture: ComponentFixture<ManufacturermasterhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturermasterhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturermasterhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
