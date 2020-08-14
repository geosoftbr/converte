import { TestBed } from '@angular/core/testing';

import { DolarTurismoService } from './dolar-turismo.service';

describe('DolarTurismoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DolarTurismoService = TestBed.get(DolarTurismoService);
    expect(service).toBeTruthy();
  });
});
