import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from './Models/Game';
import { profile } from './Models/Profile';
const chessWebApi = require('chess-web-api');


@Injectable({
  providedIn: 'root'
})
export class ChessWebService {
  profile: profile = new profile();
  chessApi: any;
  games: Array<Game>;
  wins: number = 0;
  losses: number = 0;
  draws: number = 0;
  tilt: number = 0;
  profileSubject: BehaviorSubject<profile> = new BehaviorSubject<profile>(this.profile);
  tiltSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public isLoading: boolean = false;;
  constructor() {
    this.profile = new profile();
    this.chessApi = new chessWebApi();
    this.games = new Array<Game>();
  }
  
  public getPlayer(username: string): void
  {
    this.isLoading = true;
    this.chessApi.getPlayer(username, {}, this.setPlayer.bind(this));
    this.chessApi.getPlayerCompleteMonthlyArchives(username, new Date().getFullYear(), new Date().getMonth()+1, {}, this.getPlayerTilt.bind(this));
  }

  private setPlayer(paramone: any, response: any)
  {
    this.profile = (response.body as profile);
    this.isLoading = false;
    this.profileSubject.next(this.profile);
  }

  public getPlayerTilt(paramOne: any, response: any): void
  {
    // console.log("Tilt");
    this.games = (response.body.games as Array<Game>);
    this.games.forEach((game: Game) => this.getPlayerResult(game));
    this.tilt = Math.max(100 * this.losses / (this.wins + this.draws + this.losses) - 50, 0);
    this.tiltSubject.next(this.tilt);
    // console.log(this.tilt);
  }

  getPlayerResult(game: Game)
  {
    if (game.black.username == this.profile.username)
    {
      if (game.black.result === "win") this.wins += 1;
      else if (game.black.result === "draw") this.draws += 1;
      else this.losses += 1;
    }
    else
    {
      if (game.white.result === "win") this.wins += 1;
      else if (game.white.result === "draw") this.draws += 1;
      else this.losses += 1;
    }
  }

}

