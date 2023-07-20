import { TestBed } from '@angular/core/testing';

import { UstTpmService } from './ust-tpm.service';

describe('UstTpmService', () => {
  let service: UstTpmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UstTpmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
