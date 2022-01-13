import { TestBed } from '@angular/core/testing';

import { ChessWebService } from './chess-web.service';

describe('ChessWebService', () => {
  let service: ChessWebService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessWebService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
