import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Song} from '../../classes/song';
import {SongService} from '../../services/song.service';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrls: ['./song-search.component.css'],
  providers: [SongService]
})
export class SongSearchComponent implements OnInit {

  @Output() songSelected = new EventEmitter<string>();

  searchInput: string;
  songs: Song[];

  constructor(private songService: SongService) { 
    this.songs = [];
  }

  ngOnInit() {
    
  }

  onSearch() {
    this.songService.searchByName(this.searchInput).subscribe(data => {
      this.songs = data['tracks'].items.map((item) => new Song(item.id, item.name, item.album));
    });
  }

  onSongSelected(songId: string) {
    this.songSelected.emit(songId);
  }

}
