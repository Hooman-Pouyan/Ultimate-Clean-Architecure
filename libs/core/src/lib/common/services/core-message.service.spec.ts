import { TestBed } from '@angular/core/testing';

import { CoreMessageService } from './core-message.service';

describe('CoreMessageService', () => {
  let service: CoreMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
