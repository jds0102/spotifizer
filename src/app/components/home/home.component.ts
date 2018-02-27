import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {SpotifyAuthorizeService} from '../../services/spotify-authorize.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app';

  private songId: string | null;

  constructor(private spotifyAuthorize: SpotifyAuthorizeService, private router: Router) {
    this.songId = null;
  }

  ngOnInit(){
  }

  songSelected(songId: string) {
    this.router.navigate(['/playlists'], { queryParams: {song: songId}});
  }
}
