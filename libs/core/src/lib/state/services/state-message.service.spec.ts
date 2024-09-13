import { TestBed } from '@angular/core/testing';

import { StateMessageService } from './state-message.service';

describe('StateMessageService', () => {
  let service: StateMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
