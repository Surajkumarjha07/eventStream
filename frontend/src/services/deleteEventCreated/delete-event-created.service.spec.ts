import { TestBed } from '@angular/core/testing';

import { DeleteEventCreatedService } from './delete-event-created.service';

describe('DeleteEventCreatedService', () => {
  let service: DeleteEventCreatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteEventCreatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
