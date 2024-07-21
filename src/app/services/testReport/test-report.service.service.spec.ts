import { TestBed } from '@angular/core/testing';

import { TestReportServiceService } from './test-report.service.service';

describe('TestReportServiceService', () => {
  let service: TestReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
