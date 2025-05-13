import { TestBed } from '@angular/core/testing';

import { FlattedJsonService } from './flatted-json.service';

describe('FlattedJsonService', () => {
  let service: FlattedJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlattedJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
