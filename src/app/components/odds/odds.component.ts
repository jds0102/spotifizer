import { Component, OnInit } from '@angular/core';
import {OddsService} from '../../services/odds.service';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.css'],
  providers: [OddsService]
})
export class OddsComponent implements OnInit {

  private games;

  constructor(private oddsService: OddsService) { }

  ngOnInit() {
    // this.oddsService.getNflOdds().subscribe((data) => {
    //   this.data = data;
    // });
    let data = this.oddsService.getNflOdds();
    console.log(data);
    this.games = Object.values(data['data']['events']);
    console.log(this.games);
    this.games = this.games.map((game) => {
      let odds = game['sites']['pinnacle']['odds']['h2h'];
      let diff = parseFloat(odds[0]) - parseFloat(odds[1]);
      if (diff > 0) {
        game['winner'] = game['participants'][0];
        game['loser'] = game['participants'][1];
      } else {
        game['winner'] = game['participants'][1];
        game['loser'] = game['participants'][0];
      }
      game['confidence'] = Math.abs(diff);
      return game;
    })
    this.games.sort((a,b) => {
      // return b['confidence'] - a['confidence'];
      return a['commence'] - b['commence'];
    });
  }

}
