import { TestBed } from '@angular/core/testing';

import { UpdateEmailService } from './update-email.service';

describe('UpdateEmailService', () => {
  let service: UpdateEmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateEmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
