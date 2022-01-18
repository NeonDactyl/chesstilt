import { Game } from "./Game";
import { GameResponse } from "./GameResponse";

export class GameCollection {
    "Games": Array<Game>;
    "username": string;
    "Wins": number = 0;
    "Draws": number = 0;
    "Losses": number = 0;

    constructor(games: Array<GameResponse> = new Array<GameResponse>(), username: string = '') {
        this.Games = new Array<Game>();
        games.forEach(game => this.Games.push(new Game(game)));
        this.username = username;
        this.Games.forEach(game => this.getGameResult(game));
    }
    

    private getGameResult(game: Game): void {
        if (game.black.username == this.username)
        {
          if (game.black.result === "win") this.Wins += 1;
          else if (game.black.result === "draw") this.Draws += 0.5;
          else this.Losses += 1;
        }
        else
        {
          if (game.white.result === "win") this.Wins += 1;
          else if (game.white.result === "draw") this.Draws += 0.5;
          else this.Losses += 1;
        }
    }

    public length = () => this.Wins + this.Draws + this.Losses;
    public tilt = () => Math.max(0, 100 * (this.Losses / this.length()) - 50);
}