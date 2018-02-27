import { TestBed, inject } from '@angular/core/testing';

import { SpotifyAuthorizeService } from './spotify-authorize.service';

describe('SpotifyAuthorizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAuthorizeService]
    });
  });

  it('should be created', inject([SpotifyAuthorizeService], (service: SpotifyAuthorizeService) => {
    expect(service).toBeTruthy();
  }));
});
