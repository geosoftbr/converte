import { TestBed } from '@angular/core/testing';

import { NewsIntroService } from './news-intro.service';

describe('NewsIntroService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewsIntroService = TestBed.get(NewsIntroService);
    expect(service).toBeTruthy();
  });
});
