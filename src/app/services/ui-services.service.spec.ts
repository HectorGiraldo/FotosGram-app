import { TestBed } from '@angular/core/testing';

import { UiServicesService } from './ui-services.service';

describe('UiServicesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UiServicesService = TestBed.get(UiServicesService);
    expect(service).toBeTruthy();
  });
});
