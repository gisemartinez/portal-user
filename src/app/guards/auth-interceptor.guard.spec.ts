import { TestBed, async, inject } from '@angular/core/testing';

import { AuthInterceptorGuard } from './auth-interceptor.guard';

describe('AuthInterceptorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInterceptorGuard]
    });
  });

  it('should ...', inject([AuthInterceptorGuard], (guard: AuthInterceptorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
