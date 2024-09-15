import { TestBed } from '@angular/core/testing';

import { DeleteEventBookedService } from './delete-event-booked.service';

describe('DeleteEventBookedService', () => {
  let service: DeleteEventBookedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteEventBookedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
