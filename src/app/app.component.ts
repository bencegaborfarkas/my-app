import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor() { }

  ngOnInit() {
    // init localstorage
    localStorage.setItem("teams", JSON.stringify([
      {
        id: "1",
        name: "team1",
        playerIds: [1, 2, 3]
      },
      {
        id: "2",
        name: "team2",
        playerIds: [1, 3]
      },
      {
        id: "3",
        name: "team3",
        playerIds: []
      }
    ]));
    localStorage.setItem("players", JSON.stringify([
      {
        id: "1",
        name: "player1"
      },
      {
        id: "2",
        name: "player2"
      },
      {
        id: "3",
        name: "player3"
      }
    ]));
    localStorage.setItem("teamCounter", '4');
    localStorage.setItem("playerCounter", '4');
    console.log("APP COMPONENT");
  }

}
