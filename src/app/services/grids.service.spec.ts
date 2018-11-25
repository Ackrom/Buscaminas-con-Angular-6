import { TestBed, inject } from '@angular/core/testing';

import { GridsService } from './grids.service';

describe('GridsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridsService]
    });
  });

  it('should be created', inject([GridsService], (service: GridsService) => {
    expect(service).toBeTruthy();
  }));
});
