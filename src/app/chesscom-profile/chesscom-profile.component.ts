import { state, style, trigger } from '@angular/animations';
import { Component, EventEmitter, HostBinding, Input, OnInit, Output } from '@angular/core';
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
  tilt: number = 0;
  @HostBinding('style.--target-tilt')
  private targetTilt: string = '0%';
  @Output()
  usernameSet: EventEmitter<string> = new EventEmitter<string>();
  profile: profile = new profile();
  private readonly urlMatcher = /https:\/\/www\.chess.com\/member\/(.+)/;
  constructor(private chesscomWebService: ChessWebService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(x =>
        {
          this.username = x['username'];
          this.usernameSet.next(this.username);
          this.chesscomWebService.getPlayer(this.username);
        })
    }

  ngOnInit(): void {
    this.username = this.route.snapshot.data['username'];
    this.chesscomWebService.profileSubject.subscribe(x => 
      {
        this.profile = x;
        if (this.profile.avatar === undefined || this.profile.avatar === '') this.profile.avatar = 'https://www.chess.com/bundles/web/images/user-image.007dad08.svg'
        let match = this.urlMatcher.exec(this.profile.url);
        if (!!match) this.username = match![1];
        this.chesscomWebService.usernameSubject.next(this.username);
      });
    this.chesscomWebService.tiltSubject.subscribe(x => {
      this.tilt = x;
      this.targetTilt = `${this.tilt * 90 / 100}deg`;
    });
    this.chesscomWebService.getPlayer(this.username);
  }
  isLoading(): boolean {
    return this.chesscomWebService.isLoading;
  }

  isValidUser(): boolean {
    return !this.chesscomWebService.invalidUser;
  }

  hasGames(): boolean {
    return this.chesscomWebService.gameCount !== 0;
  }
}
