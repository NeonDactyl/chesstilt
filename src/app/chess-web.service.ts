import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { profile } from './Models/Profile';
const chessWebApi = require('chess-web-api');


@Injectable({
  providedIn: 'root'
})
export class ChessWebService {
  profile: profile = new profile();
  profileSubject: BehaviorSubject<profile> = new BehaviorSubject<profile>(this.profile);
  public isLoading: boolean = false;;
  constructor() {
    this.profile = new profile();
  }
  
  public getPlayer(username: string): void
  {
    this.isLoading = true;
    let x = new chessWebApi().getPlayer(username, {}, this.setPlayer.bind(this));
  }

  private setPlayer(paramone: any, response: any)
  {
    this.profile = (response.body as profile);
    this.isLoading = false;
    this.profileSubject.next(this.profile);
  }
}

