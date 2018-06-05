import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  teams: any[];
  players: any[];
  summary: any[];
  selectedTeam: any;

  constructor() { }


  selectTeam = function(selectedTeam: any){


    this.selectedTeam = selectedTeam;
    console.log(this.selectedTeam);

  };


  ngOnInit() {

    this.teams = JSON.parse(localStorage.getItem('teams'));
    this.players = JSON.parse(localStorage.getItem('players'));
    console.log(this.players);

    // merge
    this.teams.forEach((team) => {

      team.players = [];
      team.playerIds.forEach((id) => {
        let tmpPlayer = this.players.find( player  => player.id === id.toString() );
        team.players.push(tmpPlayer);
      });

    });
    this.summary = JSON.parse(JSON.stringify(this.teams));

  }

}
