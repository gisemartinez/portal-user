import { TestBed, async, inject } from '@angular/core/testing';

import { RadiusAuthGuard } from './radius-auth.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('RadiusAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [RadiusAuthGuard]
    });
  });

  it('should ...', inject([RadiusAuthGuard], (guard: RadiusAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
