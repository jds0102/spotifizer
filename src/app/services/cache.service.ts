import { Injectable } from '@angular/core';
import { PlaylistService } from './playlist.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class CacheService {
  count: number;
  cacheCompleteEmitter: Observer<boolean>;
  songCacheCompleteEmitters:any; //This is a dictionary of observers {plalistyId: observer}

  completeCallback: Function;

  constructor(private playlistService: PlaylistService) { 
    this.count = 0;
    this.songCacheCompleteEmitters = [];
  }

  public initPlaylistCache(completeCallback: Function) {
    this.completeCallback = completeCallback;
    window.localStorage.setItem('playlists', JSON.stringify([])); 
    this.cachePlaylists(0, 50).subscribe(data => this.initSongCache());
  }

  public getPlaylists(): any[] {
    return JSON.parse(window.localStorage.getItem('playlists'));
  }

  public findPlaylistsBySong(songUri: string): any[] {
    let matchingPlaylistIds: any[] = [];
    
    let playlistTracks : any | null = JSON.parse(window.localStorage.getItem('playlistTracks'));
    if (playlistTracks === null) {
      return [];
    }

    matchingPlaylistIds = Object.keys(playlistTracks);
    
    matchingPlaylistIds = matchingPlaylistIds.filter(uri => {
      return songUri in playlistTracks[uri];
    });

    return this.getPlaylists().filter(playlist => matchingPlaylistIds.indexOf(playlist["id"]) !== -1);
  }

  private cachePlaylists(offset: number, limit: number): Observable<boolean> {
    this.playlistService.getMyPlaylists(offset, limit).subscribe((data) => {
      let playlists = JSON.parse(window.localStorage.getItem('playlists')) as any[];
      playlists = playlists.concat(data['items']);
      this.count ++;
      window.localStorage.setItem('playlists', JSON.stringify(playlists));
      if (parseInt(data['total']) > offset + limit) {
        this.cachePlaylists(offset+limit, limit);
      } else {
        this.cacheCompleteEmitter.next(true);
      }
    });
    return Observable.create(e => this.cacheCompleteEmitter = e);
  }

  private initSongCache() {
    let playlists: any[] = JSON.parse(window.localStorage.getItem('playlists'));
    if (playlists != null) {
      // for (let i = 0; i < 12;  i++) {
      //   let playlist = playlists[i];
      //   this.initSongCacheForPlaylist(playlist['id'], playlist['owner']['id']);
      // }

      let totalCachedPlaylists: number = 0;
      playlists.forEach(playlist => {
        this.initSongCacheForPlaylist(playlist['id'], playlist['owner']['id']).subscribe(data => {
          totalCachedPlaylists++;
          if (totalCachedPlaylists >= playlists.length) {
            this.completeCallback();
          }
        })
      })
    }
  }

  private initSongCacheForPlaylist(playlistId: string, playlistUserId: string): Observable<boolean> {
    return this.cacheSongsForPlaylist(playlistId, playlistUserId, 0);
  }

  private cacheSongsForPlaylist(playlistId: string, playlistUserId: string, offset: number) : Observable<boolean> | null {
    
    let observable = null;

    if (!this.songCacheCompleteEmitters[playlistId]) {
      this.songCacheCompleteEmitters[playlistId] = null;
      observable = Observable.create(e => this.songCacheCompleteEmitters[playlistId] = e);
    } 

    const limit = 100;
    
    this.playlistService.getSongsByPlaylist(playlistId, playlistUserId, offset, limit).subscribe(data => {
      this.doSongCache(playlistId, data['items']);
      if (parseInt(data['total']) > offset + limit) {
        this.cacheSongsForPlaylist(playlistId, playlistUserId, offset+limit);
      } else {
        this.songCacheCompleteEmitters[playlistId].next(playlistId);
      }
    });
    return observable;
  }

  private doSongCache(playlistId: string, items: any[]) {
    let playlistTracks : any | null = JSON.parse(window.localStorage.getItem('playlistTracks'));
    if (playlistTracks === null) {
      playlistTracks = {};
    }
    let tracks : any = playlistTracks[playlistId];
    if (!tracks) {
      tracks = {};
    }
    items.forEach(item => {
      tracks[item.track.id] = item.track.name;
    })
    playlistTracks[playlistId] = tracks;
    window.localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
  }

}
