import { state, style, trigger } from '@angular/animations';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
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
  profile: profile = new profile();
  constructor(private chesscomWebService: ChessWebService,
    private route: ActivatedRoute) {
      this.route.params.subscribe(x =>
        {
          console.log('in subscription');
          console.log(x)
          this.username = x['username'];
          this.chesscomWebService.getPlayer(this.username);
        })
    }

  ngOnInit(): void {
    this.username = this.route.snapshot.data['username'];
    this.chesscomWebService.profileSubject.subscribe(x => 
      {
        this.profile = x;
        if (this.profile.avatar === undefined || this.profile.avatar === '') this.profile.avatar = 'https://www.chess.com/bundles/web/images/user-image.007dad08.svg'
      });
    this.chesscomWebService.tiltSubject.subscribe(x => {
      this.tilt = x;
      this.targetTilt = `${this.tilt * 90 / 100}deg`;
      console.log("tilt updated");
    });
    this.chesscomWebService.getPlayer(this.username);
  }

  isLoading(): boolean
  {
    return this.chesscomWebService.isLoading;
  }

}
