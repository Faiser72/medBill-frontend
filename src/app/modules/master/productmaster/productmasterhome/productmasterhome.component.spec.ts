import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmasterhomeComponent } from './productmasterhome.component';

describe('ProductmasterhomeComponent', () => {
  let component: ProductmasterhomeComponent;
  let fixture: ComponentFixture<ProductmasterhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductmasterhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmasterhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
