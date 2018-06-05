import { Component, OnInit } from '@angular/core';
declare var jquery: any;
declare var $: any;


@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playerCounter: number;
  teams: any[];
  players: any[];
  selectedTeams: any[];
  selectedPlayer: any;

  createPlayer = function(playerName: string) {

     // add new player to array
    let playerId: number;
    playerId = this.playerCounter;
    this.players.push({
      id: playerId,
      name: playerName
    });

    // update team(s) with new player
    this.selectedTeams.forEach((team) => {
      team.playerIds.push(playerId);
    });

    // remove players from localstorage
    localStorage.removeItem('players');

    // add updated players to localstorage
    localStorage.setItem('players', JSON.stringify(this.players));

    // remove teams from localstorage
    localStorage.removeItem('teams');

    // add updated teams to localstorage
    localStorage.setItem('teams', JSON.stringify(this.teams));

    // increment player counter
    this.playerCounter++;

    // remove playerCounter from localstorage
    localStorage.removeItem('playerCounter');

    // add updated playerCounter to localstorage
    localStorage.setItem('playerCounter', JSON.stringify(this.playerCounter));

    // empty teams array
    this.selectedTeams.splice(0, this.selectedTeams.length);

  };

  selectPlayer = function(selectedPlayer: any) {

    console.log(this.teams);

    // select player
    this.selectedPlayer = selectedPlayer;

    // empty selected teams array
    this.selectedTeams.splice(0, this.selectedTeams.length);

    // TODO: find a way to update view from js
    // Note: I couldn't find out (during this short time I had) how to update view and make ngFor's rows active (highlighted) based on the value of this.selectedTeams array.
    // So basically I just left this feature out.
    /*
    // fill selected teams array
    const playerId = parseInt(this.selectedPlayer.id, 10);
    this.teams.forEach((team) => {
      if(team.playerIds.indexOf(playerId) !== -1){
        this.selectedTeams.push(team);
      }
    });
    */

  };


  updatePlayer = function(playerName: string) {

    if (confirm('Are you sure to update ' + this.selectedPlayer.name)) {

      // update players attributes
      this.selectedPlayer.name = playerName;

      // update team assignments
      let playerId: number;
      playerId = this.selectedPlayer.id;

      // delete players id from every team
      this.teams.forEach((team) => {

        // if id is found then delete
        let idx: number;
        idx = team.playerIds.indexOf(playerId);
        if(idx > -1){
          team.playerIds.splice(idx, 1);
        }

      });

      // add players id to selected teams
      this.selectedTeams.forEach((team) => {
        team.playerIds.push(playerId);
      });

      // remove players from localstorage
      localStorage.removeItem('players');

      // add updated players to localstorage
      localStorage.setItem('players', JSON.stringify(this.players));

      // remove teams from localstorage
      localStorage.removeItem('teams');

      // add updated teams to localstorage
      localStorage.setItem('teams', JSON.stringify(this.teams));

      // empty selected teams array
      this.selectedTeams.splice(0, this.selectedTeams.length);

    }

  };



  deleteTeam = function(selectedTeam: any) {

    if (confirm('Are you sure to delete ' + selectedTeam.name)) {
      // find idx
      const idx = this.teams.findIndex((team) => {
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
    this.selectedTeams = [];
  }

  ngOnInit() {

    this.teams = JSON.parse(localStorage.getItem('teams'));
    this.players = JSON.parse(localStorage.getItem('players'));
    this.playerCounter = JSON.parse(localStorage.getItem('playerCounter'));
  }

}
