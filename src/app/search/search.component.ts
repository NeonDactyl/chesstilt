import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChessWebService } from '../chess-web.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  username: string = '';
  constructor(private router: Router,
    private chessWebService: ChessWebService) {
    }

  ngOnInit(): void {
    this.chessWebService.usernameSubject.subscribe(x => {
      this.username = x;
    });
  }

  goTo(event: any)
  {
    this.router.navigate(['chess.com', event['target']['value']]);
  }

}
