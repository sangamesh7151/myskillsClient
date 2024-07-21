import { TestBed } from '@angular/core/testing';

import { QuestionEndpoint } from './question-endpoint.service';

describe('QuestionEndpointServiceService', () => {
  let service: QuestionEndpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionEndpoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
