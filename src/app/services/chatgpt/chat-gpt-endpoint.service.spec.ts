import { TestBed } from '@angular/core/testing';

import { ChatGptEndpoint } from './chat-gpt-endpoint.service';

describe('ChatGptEndpointServiceService', () => {
  let service: ChatGptEndpoint;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatGptEndpoint);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
