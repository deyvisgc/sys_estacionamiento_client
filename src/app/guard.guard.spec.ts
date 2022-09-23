import { TestBed } from '@angular/core/testing';

import { ProGuard } from './guard.guard';

describe('GuardGuard', () => {
  let guard: ProGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
