import { TestBed } from '@angular/core/testing';

import { QueenService } from './queen.service';

describe('QueenService', () => {
  let service: QueenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
