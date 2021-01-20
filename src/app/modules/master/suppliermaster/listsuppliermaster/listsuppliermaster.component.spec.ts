import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsuppliermasterComponent } from './listsuppliermaster.component';

describe('ListsuppliermasterComponent', () => {
  let component: ListsuppliermasterComponent;
  let fixture: ComponentFixture<ListsuppliermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsuppliermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsuppliermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
