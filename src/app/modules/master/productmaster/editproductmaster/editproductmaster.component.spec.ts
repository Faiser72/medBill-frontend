import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproductmasterComponent } from './editproductmaster.component';

describe('EditproductmasterComponent', () => {
  let component: EditproductmasterComponent;
  let fixture: ComponentFixture<EditproductmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditproductmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproductmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
