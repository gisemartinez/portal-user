import { TestBed, async, inject } from '@angular/core/testing';

import { RadiusAuthGuard } from './radius-auth.guard';

describe('RadiusAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadiusAuthGuard]
    });
  });

  it('should ...', inject([RadiusAuthGuard], (guard: RadiusAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
