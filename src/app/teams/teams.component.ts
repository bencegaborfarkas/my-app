import {Component, OnInit, Input} from '@angular/core';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamCounter: number;
  teams: any[];
  selectedTeam: any;


  createTeam = function (teamName: string) {

    // add new team to array
    this.teams.push({
      id: this.teamCounter,
      name: teamName,
      playerIds: []
    });

    // remove teams from localstorage
    localStorage.removeItem('teams');

    // add updated teams to localstorage
    localStorage.setItem('teams', JSON.stringify(this.teams));

    // increment team counter
    this.teamCounter++;

    // remove teamCounter from localstorage
    localStorage.removeItem('teamCounter');

    // add updated teamCounter to localstorage
    localStorage.setItem('teamCounter', this.teamCounter.toString());

  };

  selectTeam = function (selectedTeam: any) {


    this.selectedTeam = selectedTeam;

  };

  updateTeam = function (teamName: string) {

    if (confirm('Are you sure to update ' + this.selectedTeam.name)) {

      // update team name
      this.selectedTeam.name = teamName;

      // remove teams from localstorage
      localStorage.removeItem('teams');

      // add updated teams to localstorage
      localStorage.setItem('teams', JSON.stringify(this.teams));

    }


  };

  deleteTeam = function (selectedTeam: any) {

    if (confirm('Are you sure to delete ' + selectedTeam.name)) {
      // find idx
      const idx = this.teams.findIndex((team) => {
        return team.id === selectedTeam.id;
      });


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

    this.teamCounter = parseInt(localStorage.getItem('teamCounter'), 10);
    this.teams = JSON.parse(localStorage.getItem('teams'));

  }

}
