import { TestBed } from '@angular/core/testing';

import { ProductCategoryMasterService } from './product-category-master.service';

describe('ProductCategoryMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductCategoryMasterService = TestBed.get(ProductCategoryMasterService);
    expect(service).toBeTruthy();
  });
});
