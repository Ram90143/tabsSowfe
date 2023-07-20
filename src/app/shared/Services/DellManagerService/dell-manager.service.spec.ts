import { TestBed } from '@angular/core/testing';

import { DellManagerService } from './dell-manager.service';

describe('DellManagerService', () => {
  let service: DellManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DellManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
