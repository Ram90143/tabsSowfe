import { TestBed } from '@angular/core/testing';

import { SecuirityService } from './security.service';

describe('SecuirityService', () => {
  let service: SecuirityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecuirityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
