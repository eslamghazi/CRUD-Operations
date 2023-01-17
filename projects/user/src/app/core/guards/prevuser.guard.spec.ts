import { TestBed } from '@angular/core/testing';

import { PrevuserGuard } from './prevuser.guard';

describe('PrevuserGuard', () => {
  let guard: PrevuserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PrevuserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
