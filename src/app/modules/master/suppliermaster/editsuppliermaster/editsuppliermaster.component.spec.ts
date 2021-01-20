import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsuppliermasterComponent } from './editsuppliermaster.component';

describe('EditsuppliermasterComponent', () => {
  let component: EditsuppliermasterComponent;
  let fixture: ComponentFixture<EditsuppliermasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsuppliermasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsuppliermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
