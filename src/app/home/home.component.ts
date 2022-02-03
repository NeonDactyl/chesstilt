import { Component, OnInit } from '@angular/core';
import { ChessWebService } from '../chess-web.service';
import { profile } from '../Models/Profile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  players: profile[] = [];

  constructor(private chesswebservice: ChessWebService) { }

  ngOnInit(): void {
    this.chesswebservice.getRandomTopPlayers().then((result) => this.players = result);
  }

  
  isLoading(): boolean {
    return this.chesswebservice.isLoading;
  }

  displayProfileName(profile: profile): string {
    return !profile.name ? profile.username : profile.name;
  }

}
