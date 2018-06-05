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
        name: "team1"
      },
      {
        id: "2",
        name: "team2"
      },
      {
        id: "3",
        name: "team3"
      }
    ]));
    localStorage.setItem("players", []);
    localStorage.setItem("teamCounter", 3);
    localStorage.setItem("playerCounter", 3);
  }

}
