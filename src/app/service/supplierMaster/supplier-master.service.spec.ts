import { TestBed } from '@angular/core/testing';

import { SupplierMasterService } from './supplier-master.service';

describe('SupplierMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SupplierMasterService = TestBed.get(SupplierMasterService);
    expect(service).toBeTruthy();
  });
});
