import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyAuthorizeService {

  private _accessToken: string|null;
  private _exiresAt: number;

  get accessToken(): string {
    if (this._accessToken == null) {
      this._accessToken = window.localStorage.getItem('accessToken');
      this._exiresAt = parseInt(window.localStorage.getItem('expiresAt'));
      if (this._accessToken == null) {
        return null;
      }
    }
    if (new Date().getTime() > this._exiresAt) {
      this._accessToken = null;
      return null;
    } else {
      return this._accessToken;
    }
  }

  constructor() { }

  setAccessToken(token: string, expiresIn: number) {
    this._accessToken = token;
    this._exiresAt = (new Date().getTime()) + (expiresIn * 1000);
    window.localStorage.setItem('accessToken', token);
    window.localStorage.setItem('expiresAt', this._exiresAt.toString());
  }

}
