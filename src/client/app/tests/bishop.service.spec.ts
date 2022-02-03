import { TestBed } from '@angular/core/testing';

import { BishopService } from './bishop.service';

describe('BishopService', () => {
  let service: BishopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BishopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
