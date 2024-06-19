import { TestBed } from '@angular/core/testing';

import { MassageService } from './message.service';

describe('MeassageService', () => {
  let service: MassageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
