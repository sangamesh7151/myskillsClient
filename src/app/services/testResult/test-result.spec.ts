import { TestBed } from '@angular/core/testing';

import { TestResultService } from './test-result.service';

describe('TestResultServiceService', () => {
  let service: TestResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
