import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChessWebService } from '../chess-web.service';
import { profile } from '../Models/Profile';

@Component({
  selector: 'app-chesscom-profile',
  templateUrl: './chesscom-profile.component.html',
  styleUrls: ['./chesscom-profile.component.scss']
})
export class ChesscomProfileComponent implements OnInit {

  username: string = '';
  profile: profile = new profile();
  constructor(private chesscomWebService: ChessWebService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.data['username'];
    this.chesscomWebService.profileSubject.subscribe(x => this.profile = x);
    this.chesscomWebService.getPlayer(this.username);
  }

  isLoading(): boolean
  {
    return this.chesscomWebService.isLoading;
  }

}
