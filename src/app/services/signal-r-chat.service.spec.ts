import { TestBed } from '@angular/core/testing';

import { SignalRChatService } from './signal-r-chat.service';

describe('SignalRChatService', () => {
  let service: SignalRChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
