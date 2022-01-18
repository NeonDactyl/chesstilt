import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from './Models/Game';
import { GameCollection } from './Models/GameCollection';
import { GameResponse } from './Models/GameResponse';
import { profile } from './Models/Profile';
const chessWebApi = require('chess-web-api');


@Injectable({
  providedIn: 'root'
})
export class ChessWebService {
  username: string = '';
  usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  profile: profile = new profile();
  chessApi: any;
  allGames: GameCollection;
  blitzGames: GameCollection;
  bulletGames: GameCollection;
  rapidGames: GameCollection;
  dailyGames: GameCollection;
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
    this.allGames = new GameCollection();
    this.blitzGames = new GameCollection();
    this.bulletGames = new GameCollection();
    this.rapidGames = new GameCollection();
    this.dailyGames = new GameCollection();
  }
  
  public getPlayer(username: string): void
  {
    this.username = username;
    this.usernameSubject.next(username);
    this.isLoading = true;
    this.chessApi.getPlayer(username, {}, this.setPlayer.bind(this));
    this.chessApi.getPlayerCompleteMonthlyArchives(username, new Date().getFullYear(), new Date().getMonth()+1, {}, this.setPlayerGames.bind(this));
  }

  private setPlayer(paramone: any, response: any)
  {
    this.profile = (response.body as profile);
    this.isLoading = false;
    this.profileSubject.next(this.profile);
  }

  public setPlayerGames(paramOne: any, response: any): void
  {
    const allGames: GameResponse[] = (response.body.games as Array<GameResponse>);
    this.allGames = new GameCollection(allGames, this.profile.username);;
    this.blitzGames = new GameCollection(allGames.filter((game) => game.time_class === "blitz").slice(-10), this.profile.username);
    this.bulletGames = new GameCollection(allGames.filter((game) => game.time_class === "bullet").slice(-10), this.profile.username);
    this.rapidGames = new GameCollection(allGames.filter((game) => game.time_class === "rapid").slice(-10), this.profile.username);
    this.dailyGames = new GameCollection(allGames.filter((game) => game.time_class === "daily").slice(-10), this.profile.username);

    this.tilt = this.allGames.tilt();
    this.tiltSubject.next(this.tilt);
  }

}

