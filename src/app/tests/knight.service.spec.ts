import { TestBed } from '@angular/core/testing';

import { KnightService } from './knight.service';

describe('KnightService', () => {
  let service: KnightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
