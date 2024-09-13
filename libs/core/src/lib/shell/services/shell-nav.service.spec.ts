import { TestBed } from '@angular/core/testing';

import { ShellNavService } from './shell-nav.service';

describe('ShellNavService', () => {
  let service: ShellNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
