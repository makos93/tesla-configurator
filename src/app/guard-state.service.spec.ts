import { TestBed } from '@angular/core/testing';

import { GuardStateService } from './guard-state.service';

describe('GuardStateService', () => {
  let service: GuardStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuardStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
