import { TestBed } from '@angular/core/testing';

import { SpecificEventService } from './specific-event.service';

describe('SpecificEventService', () => {
  let service: SpecificEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
