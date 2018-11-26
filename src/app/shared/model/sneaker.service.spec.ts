import { TestBed } from '@angular/core/testing';

import { SneakerService } from './sneaker.service';

describe('SneakerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SneakerService = TestBed.get(SneakerService);
    expect(service).toBeTruthy();
  });
});
