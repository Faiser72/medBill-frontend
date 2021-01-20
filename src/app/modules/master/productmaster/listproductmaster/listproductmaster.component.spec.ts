import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListproductmasterComponent } from './listproductmaster.component';

describe('ListproductmasterComponent', () => {
  let component: ListproductmasterComponent;
  let fixture: ComponentFixture<ListproductmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListproductmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListproductmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
