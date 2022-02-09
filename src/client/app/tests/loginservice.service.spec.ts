import { TestBed } from '@angular/core/testing';

import { LoginService } from '../services/login.service';

describe('LoginserviceService', () => {
  let service: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
