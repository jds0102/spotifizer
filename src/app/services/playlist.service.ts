import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Song} from '../classes/song';
import {SpotifyAuthorizeService} from './spotify-authorize.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class PlaylistService {

  spotifyUrl: string = 'https://api.spotify.com';
  constructor(private http: HttpClient, private spotifyAuthorize: SpotifyAuthorizeService) { }

  //Eventually page and aggregate this call
  getMyPlaylists(offset: number, limit: number) {
    let url = this.spotifyUrl + '/v1/me/playlists'
    let params: HttpParams = new HttpParams();
    params = params.append('limit', limit.toString());
    params = params.append('offset', offset.toString());
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.spotifyAuthorize.accessToken}`);
    return this.http.get(url, {params, headers});
  }

  //Again this needs to be aggregated 
  getSongsByPlaylist(playlistId, playlistUserId, offset, limit) {
    let url = this.spotifyUrl + `/v1/users/${playlistUserId}/playlists/${playlistId}/tracks`
    
        let params: HttpParams = new HttpParams();
        params = params.append('offset', offset.toString());
        params = params.append('offset', offset.toString());
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.spotifyAuthorize.accessToken}`);
        return this.http.get(url, {params, headers}).retryWhen((errors) => {
          let delay: number = 0;
          return errors
              .mergeMap((error) => { 
                if (error.status !== 429) {
                  Observable.throw(error);
                }
                error.headers.lazyInit();
                delay = (parseInt(error.headers.get('retry-after')) + 1) * 1000;
                console.log(`delay for: ${delay}`);
                return Observable.of(error).delay(delay);
              });
      });
  }

}
