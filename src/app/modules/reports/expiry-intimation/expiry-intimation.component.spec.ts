import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiryIntimationComponent } from './expiry-intimation.component';

describe('ExpiryIntimationComponent', () => {
  let component: ExpiryIntimationComponent;
  let fixture: ComponentFixture<ExpiryIntimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiryIntimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiryIntimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
