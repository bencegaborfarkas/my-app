import {Component, OnInit, Input} from '@angular/core';

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
  playerGender: string;

  constructor() {
    this.selectedTeams = [];
  }

  createPlayer (playerName: string, age: number) {

    // add new player to array
    let playerId: number;
    playerId = this.playerCounter;
    this.players.push({
      id: playerId,
      name: playerName,
      age: age,
      gender: this.playerGender
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
    localStorage.setItem('playerCounter', this.playerCounter.toString());

    // empty teams array
    this.selectedTeams.splice(0, this.selectedTeams.length);

  }

  selectPlayer (selectedPlayer: any) {

    // select player
    this.selectedPlayer = selectedPlayer;

    // copy gender
    this.playerGender = selectedPlayer.gender;

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

  }


  updatePlayer (playerName: string, playerAge: number) {

    if (confirm('Are you sure to update ' + this.selectedPlayer.name)) {

      // update players attributes
      this.selectedPlayer.name = playerName;
      this.selectedPlayer.age = playerAge;
      this.selectedPlayer.gender = this.playerGender;



      // update team assignments
      let playerId: number;
      playerId = this.selectedPlayer.id;

      // delete players id from every team
      this.teams.forEach((team) => {

        // if id is found then delete
        let idx: number;
        idx = team.playerIds.indexOf(playerId);
        if (idx > -1) {
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

  }


  deletePlayer (selectedPlayer: any) {

    if (confirm('Are you sure to delete ' + selectedPlayer.name)) {

      // delete player from teams
      let playerId: number;
      playerId = selectedPlayer.id;
      this.teams.forEach((team) => {

        // if player is assigned to team, then delete
        let index: number;
        index = team.playerIds.indexOf(playerId);
        if (index > -1) {
          team.playerIds.splice(index, 1);
        }

      });

      // find players idx
      const idx = this.players.findIndex((player) => {
        return player.id === selectedPlayer.id;
      });

      // delete player
      this.players.splice(idx, 1);

      // remove players from localstorage
      localStorage.removeItem('players');

      // add updated players to localstorage
      localStorage.setItem('players', JSON.stringify(this.players));

      // remove teams from localstorage
      localStorage.removeItem('teams');

      // add updated teams to localstorage
      localStorage.setItem('teams', JSON.stringify(this.teams));
    }

  }



  ngOnInit() {
    this.teams = JSON.parse(localStorage.getItem('teams'));
    this.players = JSON.parse(localStorage.getItem('players'));
    this.playerCounter = parseInt(localStorage.getItem('playerCounter'), 10);
  }

}
