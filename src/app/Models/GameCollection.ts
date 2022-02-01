import { Console } from "console";
import { Game } from "./Game";
import { GameResponse } from "./GameResponse";
import { Player } from "./Player";

export class GameCollection {
  "Games": Array<Game>;
  "username": string;
  "Wins": number = 0;
  "Draws": number = 0;
  "Losses": number = 0;

  constructor(games: Array<GameResponse> = new Array<GameResponse>(), username: string = '') {
    this.Games = new Array<Game>();
    games = games.sort((firstGame, secondGame) => {
      if (firstGame.end_time == secondGame.end_time) return 0;
      if (firstGame.end_time < secondGame.end_time) return 1;
      else return -1;
    })
    games.forEach(game => this.Games.push(new Game(game)));
    this.username = username;
    this.Games.forEach((game, index) => this.getGameResult(game, index));
  }


  private getGameResult(game: Game, index: number): void {
    let value: number = 1.570795 - Math.atan(index - 4);
    let result: string = '';
    let player: Player = (game.black.username.toLowerCase() == this.username.toLowerCase()) ? game.black : game.white;
    if (player.result === "win") {
      this.Wins += value;
      result = 'win';
    }
    else if (player.result === "draw" || player.result === "stalemate" || player.result === 'timevsinsufficient') {
      this.Draws += 0.5 * value;
      result = 'draw';
    }
    else {
      this.Losses += value;
      result = 'loss';
    }
    // console.log(game);
    // console.log(result);
    // console.log(`W: ${this.Wins}\t L: ${this.Losses}\t D: ${this.Draws}\t Total: ${this.Wins + this.Draws + this.Losses}\t Tilt: ${this.tilt()}\t${game.uuid}`);
  }

  public length = () => this.Wins + this.Draws + this.Losses;
  public tilt(): number {
    if (this.length() == 0) return 0;
    return 100 * this.Losses / this.length();
    // return Math.max(0, 100 * (this.Losses / this.length()) - 50);
  }
}