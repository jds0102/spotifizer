import { Component, OnInit, Input } from '@angular/core';
import {SongService} from '../../services/song.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css'],
  providers: [SongService]
})
export class AnalyzerComponent implements OnInit {
  @Input() songId: string;

  private analysis = null;

  constructor(private songService: SongService) { }

  ngOnInit() {
    this.songService.getSongAnalysis(this.songId).subscribe((data) => {
      this.analysis = data;
      console.log(this.analysis);
    });
  }

}
