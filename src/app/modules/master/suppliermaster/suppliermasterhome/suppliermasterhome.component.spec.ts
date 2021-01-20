import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliermasterhomeComponent } from './suppliermasterhome.component';

describe('SuppliermasterhomeComponent', () => {
  let component: SuppliermasterhomeComponent;
  let fixture: ComponentFixture<SuppliermasterhomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliermasterhomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliermasterhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
