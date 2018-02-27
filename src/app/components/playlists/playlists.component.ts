import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CacheService} from '../../services/cache.service';

import { Playlist } from '../../classes/playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers: [CacheService]
})
export class PlaylistsComponent implements OnInit {

  playlists: Playlist[];
  allSongs: any;
  loading: boolean;
  songUri: string;
  matchingPlaylists: Playlist[];

  constructor(private cacheService: CacheService, private route: ActivatedRoute) { 
    this.playlists = [];
    this.matchingPlaylists = [];
  }

  ngOnInit() {
    // this.playlistService.getMyPlaylists().subscribe(data => {
    //   this.playlists = data["items"].map((item) => new Playlist(item.id, item.name, item.owner.id, item.uri));
    //   this.aggregateSongs(this.playlists);
    // })
    this.loading = true;
    this.cacheService.initPlaylistCache(this.cacheComplete.bind(this));
  }

  cacheComplete() {
    this.loading = false;
    this.playlists = this.cacheService.getPlaylists();

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        if ("song" in params) {
          this.songUri = params["song"];
          this.findPlaylists();
        }
      });
  }

  findPlaylists() {
    this.matchingPlaylists = this.cacheService.findPlaylistsBySong(this.songUri);
  }

}
