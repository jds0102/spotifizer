import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private clientId = `bc3c754d5f0a4ecb8d277dfa6844e4dd`;
  private redirect = `http://localhost:4200/authorize`;
  private scopes = `playlist-read-collaborative playlist-read-private`;

  constructor() { }

  ngOnInit() {
    //check if login, redirect
    const encodedRedirect = encodeURIComponent(this.redirect);
    const encodedScopes = encodeURIComponent(this.scopes);
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${this.clientId}&response_type=token&state=foo&redirect_uri=${encodedRedirect}&scope=${encodedScopes}`;
  }

}
