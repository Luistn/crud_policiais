import { TestBed } from '@angular/core/testing';

import { PoliciaisService } from './policiais.service';

describe('PoliciaisService', () => {
  let service: PoliciaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoliciaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
