import { TestBed } from '@angular/core/testing';

import { SocketioService } from '../services/socketio.service';

describe('SocketioService', () => {
  let service: SocketioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
