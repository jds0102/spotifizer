import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import {Song} from '../classes/song';
import {SpotifyAuthorizeService} from './spotify-authorize.service';


@Injectable()
export class SongService {

  spotifyUrl: string = 'https://api.spotify.com';
  constructor(private http: HttpClient, private spotifyAuthorize: SpotifyAuthorizeService) { }

  searchByName(string: string) {

    let url = this.spotifyUrl + '/v1/search'

    const type = 'track';
    const limit = 50;
    let params: HttpParams = new HttpParams();
    params = params.append('type', type);
    params = params.append('limit', limit.toString());
    params = params.append('q', string);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.spotifyAuthorize.accessToken}`);
    return this.http.get(url, {params, headers});
  } 

  getSongAnalysis(songId: string) {

    let url = this.spotifyUrl + `/v1/audio-analysis/${songId}`;
    
        const headers = new HttpHeaders().set('Authorization', `Bearer ${this.spotifyAuthorize.accessToken}`);
        return this.http.get(url, {headers});
  }

}
