import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from './Models/Game';
import { GameCollection } from './Models/GameCollection';
import { GameResponse } from './Models/GameResponse';
import { PlayerGameSet } from './Models/PlayerGameSet';
import { profile } from './Models/Profile';
const chessWebApi = require('chess-web-api');


@Injectable({
  providedIn: 'root'
})
export class ChessWebService {
  username: string = '';
  key:string;
  usernameSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  profile: profile = new profile();
  chessApi: any;
  playerGameSet: PlayerGameSet = new PlayerGameSet();
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
    this.key = 'blitz';
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
    this.playerGameSet['all'] = new GameCollection(allGames.slice(-10), this.profile.username);;
    this.playerGameSet['blitz'] = new GameCollection(allGames.filter((game) => game.time_class === "blitz").slice(-10), this.profile.username);
    this.playerGameSet['bullet'] = new GameCollection(allGames.filter((game) => game.time_class === "bullet").slice(-10), this.profile.username);
    this.playerGameSet['rapid'] = new GameCollection(allGames.filter((game) => game.time_class === "rapid").slice(-10), this.profile.username);
    this.playerGameSet['daily'] = new GameCollection(allGames.filter((game) => game.time_class === "daily").slice(-10), this.profile.username);
    
    this.setGameCollection(this.key);
    this.isLoading = false;
  }

  public setGameCollection(key: string)
  {
    this.key = key;
    switch (key)
    {
      case 'all':
        this.tilt = this.playerGameSet['all'].tilt();
        this.gameCount = this.playerGameSet['all'].length();
        break;
      case 'daily':
        this.tilt = this.playerGameSet['daily'].tilt();
        this.gameCount = this.playerGameSet['daily'].length();
        break;
      case 'bullet':
        this.tilt = this.playerGameSet['bullet'].tilt();
        this.gameCount = this.playerGameSet['bullet'].length();
        break;
      case 'blitz':
        this.tilt = this.playerGameSet['blitz'].tilt();
        this.gameCount = this.playerGameSet['blitz'].length();
        break;
      case 'rapid':
        this.tilt = this.playerGameSet['rapid'].tilt();
        this.gameCount = this.playerGameSet['rapid'].length();
        break;
    }
    this.tiltSubject.next(this.tilt);
  }

  public async getRandomTopPlayers(): Promise<profile[]> {
    this.isLoading = true;
    let result: profile[] = [];
    await this.chessApi.getLeaderboards().then((response: any) => {
      result = response.body.live_blitz
        .sort(() => 0.5 - Math.random())
        .slice(0,4)
        .map((x: profile) => x);
    },
    (error: any) => {
      
    });
    this.isLoading = false;
    return result;
  }

}

