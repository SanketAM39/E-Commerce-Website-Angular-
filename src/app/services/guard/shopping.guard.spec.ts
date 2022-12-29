import { TestBed } from '@angular/core/testing';

import { customerGuard } from './shopping.guard';

describe('ShoppingGuard', () => {
  let guard: customerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(customerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
