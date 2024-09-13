import { TestBed } from '@angular/core/testing';

import { ShellProgressbarService } from './shell-progressbar.service';

describe('ShellBreadcrumbService', () => {
  let service: ShellProgressbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellProgressbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
