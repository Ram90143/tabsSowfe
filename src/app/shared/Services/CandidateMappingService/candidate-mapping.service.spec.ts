import { TestBed } from '@angular/core/testing';

import { CandidateMappingService } from './candidate-mapping.service';

describe('CandidateMappingService', () => {
  let service: CandidateMappingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateMappingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
