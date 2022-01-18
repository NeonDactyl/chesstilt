import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChessWebService } from '../chess-web.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  constructor(private router: Router,
    private chessWebService: ChessWebService) {
    }

  ngOnInit(): void {
    this.chessWebService.usernameSubject.subscribe(x => {
      this.username = x;
      console.log('set username in header subscription: ' + this.username);
    });
  }

  goTo(event: any)
  {
    this.router.navigate(['chess.com', event['target']['value']]);
  }



}
