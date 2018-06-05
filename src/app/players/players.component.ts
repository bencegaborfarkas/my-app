import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  teams: any[];
  players: any[];
  selectedTeams: any[];
  selectedPlayer: any;

  createPlayer = function(playerName: string) {

    //console.log(playerName);
    //console.log(this.selectedTeams);



    // add new player to array
    this.players.push({
      name: playerName
    });

    // remove players from localstorage
    localStorage.removeItem('players');

    // add updated players to localstorage
    localStorage.setItem('players', JSON.stringify(this.players));

    // close modal
    $('#createplayerModal').modal('hide');

  };


  updateTeam = function(selectedTeam: any, teamName: string) {

    // update team name
    selectedTeam.name = teamName;

    // remove teams from localstorage
    localStorage.removeItem('teams');

    // add updated teams to localstorage
    localStorage.setItem('teams', JSON.stringify(this.teams));

    // test
    /* let tmp = JSON.parse(localStorage.getItem('teams'));
    console.log(tmp);*/

    // close modal
    $.element('#updateTeamModal').modal('hide');

  };

  deleteTeam = function(selectedTeam: any) {

    if(confirm("Are you sure to delete "+ selectedTeam.name)) {
      // find idx
      let idx = this.teams.findIndex((team) => {
        return team.id === selectedTeam.id;
      });

      console.log(idx);

      // delete object
      this.teams.splice(idx, 1);

      // remove teams from localstorage
      localStorage.removeItem('teams');

      // add updated teams to localstorage
      localStorage.setItem('teams', JSON.stringify(this.teams));
    }

  };

  constructor() {

  }

  ngOnInit() {

    this.teams = JSON.parse(localStorage.getItem('teams'));
    this.players = JSON.parse(localStorage.getItem('players'));
    console.log(this.players);
  }

}
