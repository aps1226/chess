import { TestBed } from '@angular/core/testing';

import { RookService } from './rook.service';

describe('RookService', () => {
  let service: RookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
