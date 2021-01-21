import { TestBed } from '@angular/core/testing';

import { ManufactureMasterServiceService } from './manufacture-master-service.service';

describe('ManufactureMasterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManufactureMasterServiceService = TestBed.get(ManufactureMasterServiceService);
    expect(service).toBeTruthy();
  });
});
