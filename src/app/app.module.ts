import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TeamsComponent } from './teams/teams.component';

import { FormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { PlayersComponent } from './players/players.component';

const appRoutes: Routes = [
  { path: 'summary', component: SummaryComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'players', component: PlayersComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TeamsComponent,
    SummaryComponent,
    PlayersComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
