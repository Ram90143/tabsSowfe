import { TestBed } from '@angular/core/testing';

import { SodatafetchService } from './sodatafetch.service';

describe('SodatafetchService', () => {
  let service: SodatafetchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SodatafetchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
