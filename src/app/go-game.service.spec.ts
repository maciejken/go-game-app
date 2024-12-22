import { TestBed } from '@angular/core/testing';

import { GoGameService } from './go-game.service';

describe('GoGameService', () => {
  let service: GoGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
