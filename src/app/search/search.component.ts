import { HtmlParser } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChessWebService } from '../chess-web.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('usernameInput', {static: false}) usernameInput: ElementRef<HTMLInputElement> | undefined;
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

  userNameChanged(event: Event) {
    this.username = (event.target as HTMLInputElement).value;
  }

  clearVisible(): boolean {
    return !(this.username.length === 0);
  }

  clear(event: Event) {
    this.username = '';
    if (!!this.usernameInput) this.usernameInput.nativeElement.focus();
  }

}
