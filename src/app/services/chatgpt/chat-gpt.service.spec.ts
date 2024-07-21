import { TestBed } from '@angular/core/testing';

import { ChatGpt } from './chat-gpt.service';

describe('ChatGptServiceService', () => {
  let service: ChatGpt;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatGpt);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
