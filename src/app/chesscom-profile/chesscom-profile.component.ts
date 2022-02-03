import { state, style, trigger } from '@angular/animations';
import { Component, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChessWebService } from '../chess-web.service';
import { profile } from '../Models/Profile';

@Component({
  selector: 'app-chesscom-profile',
  templateUrl: './chesscom-profile.component.html',
  styleUrls: ['./chesscom-profile.component.scss']
})
export class ChesscomProfileComponent implements OnInit {
  readonly gametypes: string[] = [
    'all',
    'bullet',
    'blitz',
    'rapid',
    'daily'
  ];
  currentType = "blitz";
  username: string = '';
  tilt: number = 0;
  @HostBinding('style.--target-tilt')
  private targetTilt: string = '0%';
  @HostBinding('style.--start-tilt')
  private startTilt: string = '0%';
  @ViewChild('pfp')
  profilePicture: ElementRef<HTMLImageElement> | undefined;
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
        this.startTilt = '0%';
        if (this.profile.avatar === undefined || this.profile.avatar === '') this.profile.avatar = 'https://www.chess.com/bundles/web/images/user-image.007dad08.svg'
        let match = this.urlMatcher.exec(this.profile.url);
        if (!!match) this.username = match![1];
        this.chesscomWebService.usernameSubject.next(this.username);
      });
    this.chesscomWebService.tiltSubject.subscribe(x => {
      this.profilePicture?.nativeElement.classList.remove('tilt-animation');
      if (this.profilePicture != undefined) this.triggerReflow(this.profilePicture);
      this.tilt = x;
      this.targetTilt = `${this.tilt * 90 / 100}deg`;
      this.profilePicture?.nativeElement.classList.add('tilt-animation');
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

  setGameCollection(key: string): void {
    this.currentType = key;
    this.startTilt = this.targetTilt;
    this.chesscomWebService.setGameCollection(key);
  }

  triggerReflow(element: ElementRef)
  {
    void element.nativeElement.offsetHeight;
  }
}
