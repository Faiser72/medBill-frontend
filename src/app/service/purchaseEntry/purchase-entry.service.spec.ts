import { TestBed } from '@angular/core/testing';

import { PurchaseEntryService } from './purchase-entry.service';

describe('PurchaseEntryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseEntryService = TestBed.get(PurchaseEntryService);
    expect(service).toBeTruthy();
  });
});
