import { TestBed } from '@angular/core/testing';

import { GetCreatedEventsByUserService } from './get-created-events-by-user.service';

describe('GetCreatedEventsByUserService', () => {
  let service: GetCreatedEventsByUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCreatedEventsByUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
