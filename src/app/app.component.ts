import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    // init localstorage
    let teamCounter: number;
    let playerCounter: number;
    teamCounter = parseInt(localStorage.getItem('teamCounter'), 10);
    playerCounter = parseInt(localStorage.getItem('playerCounter'), 10);

    if (!teamCounter) {

      localStorage.setItem('teamCounter', '0');
      localStorage.setItem('teams', '[]');

    }

    if (!playerCounter) {

      localStorage.setItem('playerCounter', '0');
      localStorage.setItem('players', '[]');

    }


  }

}
