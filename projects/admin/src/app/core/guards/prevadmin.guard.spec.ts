import { TestBed } from '@angular/core/testing';

import { PrevadminGuard } from './prevadmin.guard';

describe('PrevadminGuard', () => {
  let guard: PrevadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrevadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
