import { TestBed, inject } from '@angular/core/testing';

import { RadiusService } from './radius.service';

describe('RadiusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadiusService]
    });
  });

  it('should be created', inject([RadiusService], (service: RadiusService) => {
    expect(service).toBeTruthy();
  }));
});
