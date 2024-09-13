import { TestBed } from '@angular/core/testing';

import { ShellBreadcrumbService } from './shell-breadcrumb.service';

describe('ShellBreadcrumbService', () => {
  let service: ShellBreadcrumbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellBreadcrumbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
