import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes }   from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SongSearchComponent } from './components/song-search/song-search.component';
import { AnalyzerComponent } from './components/analyzer/analyzer.component';
import { AuthorizeComponent } from './components/authorize/authorize.component';

import { SpotifyAuthorizeService} from './services/spotify-authorize.service';
import { PlaylistService } from './services/playlist.service';
import { OddsComponent } from './components/odds/odds.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'playlists', component: PlaylistsComponent },
  { path: 'authorize', component: AuthorizeComponent },
  { path: 'odds', component: OddsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SongSearchComponent,
    AnalyzerComponent,
    LoginComponent,
    HomeComponent,
    AuthorizeComponent,
    OddsComponent,
    PlaylistsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SpotifyAuthorizeService, PlaylistService],
  bootstrap: [AppComponent]
})
export class AppModule { }
