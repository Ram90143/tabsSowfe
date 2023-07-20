import { TestBed } from '@angular/core/testing';

import { UstPocService } from './ust-poc.service';

describe('UstPocService', () => {
  let service: UstPocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UstPocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
