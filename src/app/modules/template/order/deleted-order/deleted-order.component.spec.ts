import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedOrderComponent } from './deleted-order.component';

describe('DeletedOrderComponent', () => {
  let component: DeletedOrderComponent;
  let fixture: ComponentFixture<DeletedOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
