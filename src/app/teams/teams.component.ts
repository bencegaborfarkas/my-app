import { Component, OnInit, Input } from '@angular/core';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teams: any[];
  selectedTeam: any;

  createTeam = function(teamName: string) {

    // add new team to array
    this.teams.push({
      name: teamName
    });

    // remove teams from localstorage
    localStorage.removeItem('teams');

    // add updated teams to localstorage
    localStorage.setItem('teams', JSON.stringify(this.teams));

    // test
    /* let tmp = JSON.parse(localStorage.getItem('teams'));
    console.log(tmp);*/

    // close modal
    $('#createTeamModal').modal('hide');

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
    console.log(this.teams);

    console.log("TEAMS COMPONENT");

  }

}
