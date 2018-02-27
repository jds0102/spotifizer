import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {SpotifyAuthorizeService} from '../../services/spotify-authorize.service';

@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private spotifyAuthorize: SpotifyAuthorizeService) { }

  ngOnInit() {
    this.route.fragment.subscribe((fragment: string|null) => {
      if (fragment != null) {
        this.processFragment(fragment);
      } else {
        this.handleError();
      }
    });
  }

  processFragment(fragment: string) {
    const paramStrings = fragment.split("&");
    let params = {};
    paramStrings.forEach((ps) => {
      const psSplit = ps.split('=');
      params[psSplit[0]] = psSplit[1];
    });

    this.spotifyAuthorize.setAccessToken(params['access_token'], params['expires_in']);

    if (params['state'] == "foo") {
      this.router.navigate(['/']);
    }
    
  }

  handleError() {
    console.log('error');
  }

}
