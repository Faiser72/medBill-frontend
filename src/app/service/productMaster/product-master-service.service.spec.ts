import { TestBed } from '@angular/core/testing';

import { ProductMasterServiceService } from './product-master-service.service';

describe('ProductMasterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductMasterServiceService = TestBed.get(ProductMasterServiceService);
    expect(service).toBeTruthy();
  });
});
