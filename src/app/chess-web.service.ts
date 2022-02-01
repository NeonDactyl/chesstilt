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
  private nextUserName: string = '';
  gameCount: number = 0;
  tilt: number = 0;
  public invalidUser: boolean = false;
  public invalidUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.invalidUser);
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
    if (this.isLoading)
    {
      if (this.nextUserName != username) {
        this.nextUserName = username;
        return;
      }
      this.nextUserName = '';
    }
    this.isLoading = true;
    this.username = username;
    this.usernameSubject.next(username);
    this.chessApi.getPlayer(username, {}, this.setPlayer.bind(this));
  }

  private setPlayer(paramone: any, response: any)
  {
    if (paramone) {
      if (paramone.statusCode == 404)
      {
        this.invalidUser = true;
        this.invalidUserSubject.next(this.invalidUser);
      }
      this.isLoading = false;
      return;
    }
    this.invalidUser = false;
    this.invalidUserSubject.next(this.invalidUser);
    this.profile = (response.body as profile);
    this.profileSubject.next(this.profile);
    if (this.nextUserName == '') this.chessApi.getPlayerCompleteMonthlyArchives(this.username, new Date().getFullYear(), new Date().getMonth()+1, {}, this.setPlayerGames.bind(this));
    else {
      this.getPlayer(this.nextUserName);
    }
  }
  
  public setPlayerGames(paramOne: any, response: any): void
  {
    const allGames: GameResponse[] = (response.body.games as Array<GameResponse>);
    // this.allGames = new GameCollection(allGames, this.profile.username);;
    this.blitzGames = new GameCollection(allGames.filter((game) => game.time_class === "blitz").slice(-10), this.profile.username);
    // this.bulletGames = new GameCollection(allGames.filter((game) => game.time_class === "bullet").slice(-10), this.profile.username);
    // this.rapidGames = new GameCollection(allGames.filter((game) => game.time_class === "rapid").slice(-10), this.profile.username);
    // this.dailyGames = new GameCollection(allGames.filter((game) => game.time_class === "daily").slice(-10), this.profile.username);
    
    this.tilt = this.blitzGames.tilt();
    this.gameCount = this.blitzGames.length();
    this.tiltSubject.next(this.tilt);
    this.isLoading = false;
  }

}

