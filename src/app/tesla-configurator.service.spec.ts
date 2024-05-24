import { TestBed } from '@angular/core/testing';

import { TeslaConfiguratorService } from './tesla-configurator.service';

describe('TeslaConfiguratorService', () => {
  let service: TeslaConfiguratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaConfiguratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
