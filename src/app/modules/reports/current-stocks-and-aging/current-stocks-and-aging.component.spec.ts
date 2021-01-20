import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentStocksAndAgingComponent } from './current-stocks-and-aging.component';

describe('CurrentStocksAndAgingComponent', () => {
  let component: CurrentStocksAndAgingComponent;
  let fixture: ComponentFixture<CurrentStocksAndAgingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentStocksAndAgingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentStocksAndAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
