import { TestBed } from '@angular/core/testing';

import { LoyalCustServiceService } from './loyal-cust-service.service';

describe('LoyalCustServiceService', () => {
  let service: LoyalCustServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoyalCustServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
